import client from '../client';

module.exports = {
	command: 'projects',
	describe: 'The accounts projects',
	builder: {},
	handler: () => {
		client.authenticate().then(() => {
			client.getProjects().then((projects) => {
				projects.map((project) => {
					console.log(project.name);
				});

				if (!projects || (projects && projects.length === 0)) {
					console.log('No projects found.');
				}
			});
		});
	},
};
