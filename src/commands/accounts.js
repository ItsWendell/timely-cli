import TimelyAPI from '../client';

module.exports = {
	command: 'accounts',
	describe: 'Select a account for current session',
	builder: {},
	hanlder: () => {
		TimelyAPI.selectAccount();
	},
};

/*
app
	.command('logout', 'Clear your session')
	.alias('signout')
	.action(function (args, callback) {
		TimelyAPI.logout().then(() => {
			callback();
		});
	});
*/
