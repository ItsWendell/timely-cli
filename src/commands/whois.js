import TimelyAPI from '../client';

module.exports = {
	command: 'whois',
	describe: 'Retrieve the current authenticated user and account.',
	builder: {},
	handler: function (argv) {
		TimelyAPI.authenticate().then(async () => {
			const user = await TimelyAPI.getUser();
			const account = TimelyAPI.account;

			console.log(`You are logged in as ${user.email} (${user.name}) @ ${account.name}`);
		}).catch((error) => {
			console.log('You\'re not authenticated into an account.', error);
		});
	}
};
