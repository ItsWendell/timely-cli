import vorpal from 'vorpal';
import storage from 'node-persist';
import TimelyAPI from './timely';
import { EventEmitter } from 'events';
import AutocompletePrompt from 'inquirer-autocomplete-prompt';

import LoginCommands from './commands/login';
import AccountsCommands from './commands/accounts';
import ProjectsCommands from './commands/projects';
import EntriesCommands from './commands/entries';
import SystemCommands from './commands/system';

export class App extends EventEmitter {
	constructor() {
		super();
		this.commander = vorpal();
		this.commander.ui.inquirer.registerPrompt('autocomplete', AutocompletePrompt);

		this.commander.use(SystemCommands);
	}

	async initialize() {
		try {
			await storage.init();
		} catch (error) {
			console.error(error);
		}
	}

	authenticate() {
		const { commander } = this;

		TimelyAPI.authenticate().then(() => {
			console.log('Welcome back to the Timely CLI!');
			commander.use(AccountsCommands);

			if (TimelyAPI.account) {
				commander.use(ProjectsCommands);
				commander.use(EntriesCommands);

				commander.delimiter(` ~Timely/${TimelyAPI.account.name} >`);
			}
			commander.show();
		}).catch(async () => {
			console.log("You're not logged in Timely yet!");
			commander.use(LoginCommands);
			commander.delimiter('').show();
			commander.exec('login').then(() => {
				commander.use(AccountsCommands);
				commander.exec('accounts select').then(() => {
					commander.use(ProjectsCommands);
					commander.show();
				});
			}).catch(() => {

			});
			// commander.show();
		});
	}
}

export default new App();
