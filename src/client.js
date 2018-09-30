import storage from 'node-persist';
import inquirer from 'inquirer';
import moment from 'moment';

import TimelyAPI from './providers/timely-api';

class Client {
	constructor() {
		this.api = new TimelyAPI(process.env.TIMELY_APP_ID, process.env.TIMELY_APP_SECRET);
		this.tokens = {};
		this.account = null;
		this.accounts = {};
		this.timerId = null;
	}

	async initialize() {
		try {
			await storage.init();
			this.account = await storage.getItem('account');
			this.tokens = await storage.getItem('tokens');
			if (this.tokens) {
				this.api.setTokens(this.tokens);
			}
		} catch (error) {
			console.log('Error loading states', error.message);
		}
	}

	saveAccount(account) {
		storage.setItem('account', account);
		this.account = account;
	}

	saveTokens(tokens) {
		this.api.setTokens(tokens);
		storage.setItem('tokens', tokens);
	}

	authenticate() {
		const { api } = this;
		return new Promise((resolve, reject) => {
			api.authenticate(this.tokens).then(() => {
				if (!this.account) {
					this.selectAccount().then(() => {
						resolve(this.account);
					}).catch(error => reject(error));
				} else {
					resolve(this.account);
				}
			}).catch((error) => {
				console.log('Preload error', error);
				console.log('Login with Timely: ', api.authorizeURL());
				inquirer.prompt([{
					name: 'authCode',
					message: 'Authorization code: ',
				}]).then(({ authCode }) => {
					api.authorize(authCode).then((tokens) => {
						this.saveTokens(tokens);
						this.selectAccount().then((account) => {
							resolve(account);
						});
					}).catch(reject);
				});
			});
		});
	}

	logout = async () => {
		storage.clear();
	}

	selectAccount() {
		const { api } = this;
		return new Promise((resolve, reject) => {
			api.getAccounts().then((accounts) => {
				console.log('accounts', accounts);
				const choices = Object.values(accounts).map(account => ({
					name: account.name,
					value: account.id,
				}));
				inquirer.prompt({
					type: 'list',
					name: 'accountId',
					message: 'Select a account to use',
					choices,
				}).then(({ accountId }) => {
					const account = accounts.filter(item => item.id === accountId)[0];
					this.saveAccount(account);

					resolve(account);
				});
			}).catch((response) => {
				reject(response);
			});
		});
	}

	getUser() {
		return this.api.getUser(this.account.id);
	}

	getProjects() {
		return this.api.getProjects(this.account.id);
	}

	startTimer(eventId = undefined) {
		return new Promise((resolve, reject) => {
			this.api.startTimer(this.account.id, eventId || this.timerId).then((event) => {
				this.timerId = event.id;
				resolve(event);
			}).catch(reject);
		});
	}

	getTimer() {
		return new Promise((resolve, reject) => {
			this.api.getEvents(this.account.id).then((events) => {
				const timers = events.filter(event => event.timer_state === 'start');
				console.log(timers);
				if (timers.length > 0) {
					this.timerId = timers[0].id;
					resolve(timers[0]);
				} else {
					reject(new Error('No timer found'));
				}
			}).catch((error) => {
				reject(error);
			});
		});
	}

	stopTimer() {
		return new Promise((resolve, reject) => {
			this.getTimer().then((event) => {
				this.api.stopTimer(this.account.id, event.id).then((result) => {
					this.timerId = undefined;
					resolve(result);
				}).catch(reject);
			}).catch(reject);
		});
	}

	createEvent(projectId, day = undefined, minutes = 0, hours = 0, note = undefined) {
		return this.api.createEvent(this.account.id, projectId, day, minutes, hours, note);
	}

	getEvents(date = null) {
		return this.api.getEvents(this.account.id, date || moment().format(moment.HTML5_FMT.DATE));
	}
}

export default new Client();
