import TimelyClient from '../client';

module.exports = {
	command: 'login',
	describe: 'Log into a Timely account :D',
	builder: {},
	handler: () => {
		TimelyClient.authenticate().then((response) => {
			console.log('Succesfully logged in at', response.name);
		}).catch((error) => {
			console.log('error', error);
		});
	},
};
