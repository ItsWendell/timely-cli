import OAuthClient from 'simple-oauth2';
import { URL } from 'url';
import { api } from '../http';
import moment, { relativeTimeThreshold } from 'moment';

const TIMELY_API_HOST = 'https://api.timelyapp.com/1.1/';

class TimelyAPI {
	constructor(appId, appSecret, redirectUri = 'urn:ietf:wg:oauth:2.0:oob') {
		const url = new URL(TIMELY_API_HOST);
		this.credentials = {
			client: {
				id: appId,
				secret: appSecret,
			},
			auth: {
				tokenHost: url.origin,
				tokenPath: `${url.pathname}/oauth/token`,
				revokePath: `${url.pathname}/oauth/revoke`,
				authorizePath: `${url.pathname}/oauth/authorize`,
			},
		};
		this.redirectUri = redirectUri;
		this.auth = OAuthClient.create(this.credentials);
		this.accessTokens = null;
	}

	/**
	 * @returns {String} authorization Url
	 */
	authorizeURL() {
		return this.auth.authorizationCode.authorizeURL({
			redirect_uri: this.redirectUri,
		});
	}

	/**
	 * Authenticate with specific accessTokens.
	 *
	 * @param {Object} tokens
	 */
	authenticate(tokens) {
		return new Promise((resolve, reject) => {
			if (!tokens) {
				reject();
				return;
			}

			this.setTokens(tokens);

			if (this.accessTokens.expired()) {
				this.accessTokens.refresh().then((tokens) => {
					console.log('refresh', tokens);
					this.setTokens(tokens);
					resolve(tokens);
				}).catch((error) => {
					reject(error);
				});
			} else {
				resolve(tokens);
			}
		});
	}

	/**
	 * Removes saved accessToken in the session.
	 */
	async logout() {
		this.accessTokens = null;
	}

	/**
	 * Authorize with a authentication code.
	 *
	 * @param {String} code
	 */
	authorize(code) {
		return new Promise((resolve, reject) => {
			this.auth.authorizationCode.getToken({
				code,
				redirect_uri: this.redirectUri,
			}).then((tokens) => {
				this.setTokens(tokens);
				resolve(tokens);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	/**
	 * Returns all accounts connected to user of current class.
	 *
	 * @returns {Promise}
	 */
	getAccounts() {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: accounts } = await api.get('/accounts');
				resolve(accounts);
			} catch (error) {
				reject(error);
			}
		});
	}

	getUser(accountId, id = 'current') {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: user } = await api.get(`/${accountId}/users/${id}`);
				resolve(user);
			} catch (error) {
				reject(error);
			}
		});
	}

	setTokens(tokens) {
		this.accessTokens = this.auth.accessToken.create(tokens);
		api.updateAccessToken(this.accessTokens.token.access_token);
	}


	getProjects(accountId) {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: projects } = await api.get(`/${accountId}/projects`);
				resolve(projects);
			} catch (error) {
				reject(error);
			}
		});
	}

	getEvents(accountId, date = undefined, endDate = null) {
		return new Promise(async (resolve, reject) => {
			const day = date ? moment(date).format(moment.HTML5_FMT.DATE) :
				moment().format(moment.HTML5_FMT.DATE);
			try {
				if (!endDate) {
					const { data: events } = await api.get(`/${this.account.id}/events`, {
						params: {
							day: moment(date).format(moment.HTML5_FMT.DATE),
						},
					});
					resolve(events);
				} else {
					const { data: events } = await api.get(`/${this.account.id}/events`, {
						params: {
							since: moment(date).format(moment.HTML5_FMT.DATE),
							upto: moment(endDate).format(moment.HTML5_FMT.DATE),
						},
					});
					resolve(events);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	createEvent(accountId, projectId, day = undefined, minutes = 0, hours = 0, note = undefined) {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: event } = await api.post(`/${accountId}/projects/${projectId}/events`, {
					event: {
						day: moment(day).format(moment.HTML5_FMT.DATE),
						minutes: Number.parseInt(minutes, 10),
						hours: Number.parseInt(hours, 10),
						note
					}
				});

				resolve(event);
			} catch (error) {
				reject(error);
			}
		});
	}

	startTimer(accountId, eventId) {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: event } = api.put(`/${accountId}/events/${eventId}/start`);
				return event;
			} catch (error) {
				reject(error);
			}
		});
	}

	startTimer(accountId, eventId) {
		return new Promise(async (resolve, reject) => {
			try {
				const { data: event } = api.put(`/${accountId}/events/${eventId}/stop`);
				return event;
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default TimelyAPI;
