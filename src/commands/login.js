import TimelyClient from '../client';

module.exports = {
	command: 'login',
	describe: 'Log into a Timely account :D',
	builder: {},
	handler: (argv) => {
		TimelyClient.authenticate().then((response) => {
			console.log('Succesfully logged in at', response.name);
		});
	}
};
