import 'dotenv/config';
import inquirer from 'inquirer';
import storage from 'node-persist';
import yargs from 'yargs';
import LoginCommand from './commands/login';
import WhoisCommand from './commands/whois';
import EventsCreateCommand from './commands/events';
import { TimerStart, TimerStop } from './commands/timer';
import AutocompletePrompt from 'inquirer-autocomplete-prompt';
import TimelyAPI from './client';

async function initialize() {
	try {
		await TimelyAPI.initialize();
		await inquirer.registerPrompt('autocomplete', AutocompletePrompt);
	} catch (error) {
		console.error(error);
	}
}

initialize().then(() => {
	yargs
		.usage('Usage: $0 <command> [options]')
		.version('0.1.0')
		.epilog('Timely CLI - No more excuses!')
		.help('help')
		.alias('h', 'help');

	yargs
		.command(LoginCommand)
		.command(WhoisCommand)
		.command(EventsCreateCommand)
		.command(TimerStart)
		.command(TimerStop);

	/**
	 * System commands for testing and evaluation purposes
	 */
	yargs
		.command('storage', 'Check the current localStorage', () => { }, async (args) => {
			await storage.init();
			if (args.clear) {
				await storage.clear();
				console.log('Storage cleared!');
				return;
			}
			console.log(await storage.values(), await storage.keys());
		})
		.option('clear', {
			alias: 'c',
			default: false
		})

	yargs.argv;
});
