import app from '../app';
import TimelyAPI from '../client';

app
	.command('projects', 'The accounts projects')
	.alias('projects list')
	.action(function (args, callback) {
		TimelyAPI.getProjects().then((projects) => {
			const choices = Object.values(projects).map((project) => ({
				name: project.name,
				value: project.id,
			}));
			this.prompt({
				type: 'autocomplete',
				name: 'projectId',
				message: 'Select a project to use',
				choices,
			}).then(({ projectId }) => {
				TimelyAPI.activeProjectId = projectId;
				app.delimiter(`~ Timely/${TimelyAPI.account.name}/${TimelyAPI.project.name}>`);
				callback();
			});
		});
	});
