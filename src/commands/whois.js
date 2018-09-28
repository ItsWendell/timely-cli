import inquirer from 'inquirer';
import app from '../app';
import TimelyAPI from '../client';
import Command from './command';

export default new Command('whois', 'Retrieve the current authenticated user and account.', () => { }, (argv) => {
	TimelyAPI.authenticate().then(async () => {
		const user = await TimelyAPI.getUser();
		const account = TimelyAPI.account;

		console.log(`You are logged in as ${user.email} (${user.name}) @ ${account.name}`);
	}).catch((error) => {
		console.log('You\'re not authenticated into an account.', error);
	});
});
