import TimelyAPI from '../client';
import moment from 'moment';
import inquirer from 'inquirer';
import fuzzy from 'fuzzy';
import app from 'yargs';
import Command from './command';

const TimerStart = new Command('timer start', 'Start a new timer', () => { }, async (args) => {
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
				}, {
					type: 'input',
					name: 'note',
					message: 'Choose a note for this entry?',
					when: !args.note,
				}]).then(({ projectName, note }) => {
					const projectId = projects.filter(project => project.name === projectName)[0].id;
					// STEP 1, create event.
					const durationTime = duration ? duration.split(':', 2) : [];
					TimelyAPI.createEvent(projectId, date, 0, 0, note).then((event) => {
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
				}).catch((error) => console.log('error', error));
		});
	});
});

const TimerStop = new Command('timer stop', 'Stop any running timer for today', () => { }, async (args) => {
	TimelyAPI.authenticate().then(async () => {
		TimelyAPI.stopTimer().then((event) => {
			console.log('Succesfully stopped timer for', event.note);
		}).catch((erro) => {
			console.log('Something went wrong', error);
		})
	});
});
