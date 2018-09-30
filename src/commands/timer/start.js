import moment from 'moment';
import inquirer from 'inquirer';
import fuzzy from 'fuzzy';
import TimelyAPI from '../../client';

module.exports = {
	command: 'timer start',
	describe: 'Start a new timer',
	builder: {},
	handler: async (args) => {
		TimelyAPI.authenticate().then(async () => {
			TimelyAPI.getProjects().then((projects) => {
				const list = projects.map(project => project.name);
				inquirer.prompt([
					{
						type: 'autocomplete',
						name: 'projectName',
						message: 'Choose a project',
						source(answers, input) {
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
					TimelyAPI.createEvent(
						projectId,
						moment().format(moment.HTML5_FMT.DATE), 0, 0, note,
					).then((event) => {
						TimelyAPI.startTimer(event.id).then((timer) => {
							console.log('Timer started for', timer.note);
						}).catch((error) => {
							console.log('Whoops, we created a event but not a timer!', error);
						});
					}).catch((error) => {
						console.log('whooppss somethin went wrong...', error);
					});
				}).catch(error => console.log('error', error));
			});
		});
	},
};
