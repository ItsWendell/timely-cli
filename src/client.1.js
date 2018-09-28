import OAuthClient from 'simple-oauth2';
import storage from 'node-persist';
import { EventEmitter } from 'events';
import { URL } from 'url';
import inquirer from 'inquirer';
import { api } from './http';
import moment, { relativeTimeThreshold } from 'moment';

import TimelyAPI from './providers/timely-api';

class TimelyClient extends TimelyAPI {
	constructor() {
		super(process.env.TIMELY_APP_ID, process.env.TIMELY_APP_SECRET);
		this.tokens = {};
		this.accountId = null;
		this.accounts = {};
	}

	async initialize() {
		try {
			await storage.init();
			this.accountId = await storage.getItem('accountId');
			this.tokens = await storage.getItem('tokens');
			if (this.tokens) {
				this.auth.accessToken.create(this.accessTokens);
			}
		} catch (error) {
			console.log('Error loading states', error.message);
		}
	}

	setProjectId(id) {
		storage.setItem('projectId', id);
		this.activeProjectId = id;
	}

	setAccountId(id) {
		storage.setItem('accountId', id);
		this.activeAccountId = id;
	}

	get account() {
		if (this.activeAccountId && this.accounts[this.activeAccountId]) {
			return this.accounts[this.activeAccountId];
		}
	}

	get project() {
		if (this.activeProjectId &&
			this.accounts[this.activeAccountId] &&
			this.accounts[this.activeAccountId]
				.projects[this.activeProjectId]) {
			return this.accounts[this.activeAccountId]
				.projects[this.activeProjectId];
		}
		return undefined;
	}

	saveTokens() {
		storage.setItem('tokens', this.accessTokens.token);
	}

	authenticate() {
		return new Promise(async (resolve, reject) => {
			const tokens = await storage.getItem('tokens');
			if (!tokens) {
				reject(new Error('Tokens not found'));
				return;
			}

			this.accessTokens = this.auth.accessToken.create(tokens);
			if (this.accessTokens.expired()) {
				console.log('Tokens expired, renewing');
				this.accessTokens.refresh().then(async (tokens) => {
					this.accessTokens = tokens;
					this.saveTokens();
					this.setApiHeaders();
					resolve();
				}).catch((error) => {
					reject(error);
				});
			} else {
				this.setApiHeaders();
				resolve();
			}
		});
	}

	async logout() {
		storage.clear();
		this.setAccountId(null);
		this.setProjectId(null);
		this.accessTokens = null;
	}

	setApiHeaders() {
		api.updateAccessToken(this.accessTokens.token.access_token);
	}

	authorize(code) {
		return new Promise((resolve, reject) => {
			this.auth.authorizationCode.getToken({
				code,
				redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
			}).then((tokens) => {
				this.accessTokens = this.auth.accessToken.create(tokens);
				console.log('Succesfully logged in!', this.accessTokens.token);
				this.saveTokens();
				resolve();
			}).catch((error) => {
				reject(error);
			});
		});
	}

	getAccounts() {
		return new Promise(async (resolve, reject) => {
			try {
				await this.authenticate();
				const { data: accounts } = await api.get('/accounts');
				accounts.forEach((account) => {
					this.accounts[account.id] = account;
					this.accounts[account.id].projects = {};
				});
				resolve(this.accounts);
			} catch (error) {
				reject(error);
			}
		});
	}

	selectAccount() {
		this.getAccounts().then((accounts) => {
			const choices = Object.values(accounts).map((account) => ({
				name: account.name,
				value: account.id,
			}));
			inquirer.prompt({
				type: 'list',
				name: 'accountId',
				message: 'Select a account to use',
				choices,
			}).then(({ accountId }) => {
				this.setAccountId(accountId);
			});
		}).catch((response) => {
			console.log('error', response);
		});
	}

	getCurrentAccountName() {
		if (this.activeAccountId && this.accounts[this.activeAccountId]) {
			return this.accounts[this.activeAccountId].name;
		}
		return undefined;
	}

	getCurrentUser() {
		return api.get(`/${this.activeAccountId}/users/current`);
	}

	getProjects() {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: projects } = await api.get(`/${this.account.id}/projects`);
				projects.forEach((project) => {
					this.accounts[this.activeAccountId].projects[project.id] = project;
				});
				resolve(this.accounts[this.activeAccountId].projects);
			} catch (error) {
				reject(error);
			}
		});
	}

	getEntries(date, endDate = null) {
		return new Promise(async (resolve, reject) => {
			try {
				let entries = {};
				if (!endDate) {
					const { data: entries } = await api.get(`/${this.account.id}/events`, {
						params: {
							day: moment(date).format(moment.HTML5_FMT.DATE),
						},
					});

					entries.forEach((entry) => {
						entries[entry.id] = entry;
					});
					resolve(entries);
				}
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default new TimelyAPI();
