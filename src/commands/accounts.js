import inquirer from 'inquirer';
import app from '../app';
import TimelyAPI from '../client';
import Command from './command';

export default new Command('accounts', 'Select a account for current session', () => { }, () => {
	TimelyAPI.selectAccount();
});

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
