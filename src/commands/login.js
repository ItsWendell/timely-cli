import inquirer from 'inquirer';
import app from '../app';
import TimelyClient from '../client';
import Command from './command';

export default new Command('login', 'Log into a Timely account', () => { }, (argv) => {
	TimelyClient.authenticate().then((response) => {
		console.log('Succesfully logged in at', response.name);
	});
});
