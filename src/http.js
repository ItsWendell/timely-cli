import axios from 'axios';

/**
 * Export a plain axios reference to use in any non-api call.
 */
export default axios;

/**
 * Create a preconfigured axios instance to use in all api calls.
 */
export const api = axios.create({
	baseURL: process.env.TIMELY_API_HOST,
});

/**
 * Update the api axios instance with the latest access token.
 *
 * @param  {string?} token
 * @param  {string}  [type='Bearer']
 * @return {void}
 */
api.updateAccessToken = (token, type = 'Bearer') => {
	if (token) {
		api.defaults.headers.common.Authorization = `${type} ${token}`;
	} else {
		delete api.defaults.headers.common.Authorization;
	}
};
