import TimelyAPI from '../client';
import AutocompletePrompt from 'inquirer-autocomplete-prompt';
import moment from 'moment';
import inquirer from 'inquirer';
import chrono from 'chrono-node';
import CLITable from 'cli-table';
import fuzzy from 'fuzzy';
import app from 'yargs';
import Command from './command';

export default new Command('events create [note] [duration] [date]', 'Create a timely entry', () => { }, async (args) => {
	TimelyAPI.authenticate().then(async () => {
		TimelyAPI.getProjects().then((projects) => {
			const list = projects.map((project) =>
				project.name);
			inquirer.prompt([
				{
					type: 'autocomplete',
					name: 'projectName',
					message: 'Choose a project',
					source: function (answers, input) {
						const search = input || '';
						return new Promise((resolve) => {
							const results = fuzzy.filter(search, list);
							return resolve(results.map(result => result.string));
						});
					},
					transformer: function (projectName) {
						return
					},
				}, {
					type: 'input',
					name: 'note',
					message: 'Choose a note for this entry?',
					when: !args.note,
				}, {
					type: 'confirm',
					name: 'timer',
					message: 'Do you want to start a timer? (right now)',
					default: true,
				}, {
					type: 'input',
					name: 'duration',
					message: 'Duration for this entry? (e.g 2:30)',
					when: ({ timer }) => !args.duration && !timer,
				}, {
					type: 'input',
					name: 'date',
					message: 'Date of the entry?',
					when: ({ timer }) => !args.date && !timer,
					default: moment().format(moment.HTML5_FMT.DATE), list
				}]).then(({ projectName, note, timer, duration, date }) => {
					const projectId = projects.filter(project => project.name === projectName)[0].id;
					// STEP 1, create event.
					const durationTime = duration ? duration.split(':', 2) : [];
					TimelyAPI.createEvent(projectId, date, durationTime[1] || 0, durationTime[0] || 0, note).then((event) => {
						if (timer) {
							TimelyAPI.startTimer(event.id).then((event) => {
								console.log('Timer started for', projectName);
							}).catch((error) => {
								console.log('Whoops, we created a event but not a timer!', error);
							});
						} else {
							console.log('Sucessfully created the above event!');
						}
					}).catch((error) => {
						console.log('whooppss somethin went wrong...', error);
					});
					// STEP 2, create timer now.


					console.log('results', projectId, note, timer, durationTime, date);
				}).catch((error) => console.log('error', error));
			/*
			this.prompt([, {
				type: 'input',
				name: 'note',
				message: 'Choose a note for this entry?',
				when: !args.note,
			}, {
				type: 'confirm',
				name: 'timer',
				message: 'Do you want to start a timer? (right now)',
				default: true,
			}, {
				type: 'input',
				name: 'duration',
				message: 'Duration for this entry?',
				when: ({ timer }) => !args.duration && !timer,
			}, {
				type: 'input',
				name: 'date',
				message: 'Date of the entry?',
				when: ({ timer }) => !args.date && !timer,
				default: moment().format(moment.HTML5_FMT.DATE),
			}]).then(({ note, timer, duration, date }) => {
				if (timer) {
					console.error('Timer not supported yet!');
					return callback(false);
				}

				console.log('Answers...', answers);
				callback(answers);
			});
			*/
		});
	});
});

/*
app
	.command('entries list [date] [enddate]', 'Show entries of a specific date or range. defaults to today.')
	.action(function (args, callback) {
		let date = new Date();
		if (args.date) {
			date = chrono.parseDate(args.date);
		}

		if (!date) {
			console.log(`We tried hard but ${args.date} is an invalid date.`);
			return callback();
		}
		TimelyAPI.getEntries(date).then((entries) => {
			if (!entries.length) {
				console.log('There are no entries for', moment(date).format(moment.HTML5_FMT.DATE));
				return callback();
			}
			let table = new CLITable({
				head: ['Note', 'Time', 'Project'],
			});

			Object.values(entries).forEach((entry) => {
				table.push([
					entry.note,
					entry.duration.formatted,
					entry.project.name,
				]);
			});

			console.log(table.toString());
			callback();
		});
	});
*/
