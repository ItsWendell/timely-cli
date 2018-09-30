import 'dotenv/config';
import inquirer from 'inquirer';
import yargs from 'yargs';
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
		.usage('Usage: $0 [options] [command]')
		.version('v')
		.alias('v', 'version')
		.help('h')
		.alias('h', 'help')
		.epilog('Timely CLI - No more excuses!')
		.commandDir('commands')
		.demandCommand();
	return yargs.argv;
});
