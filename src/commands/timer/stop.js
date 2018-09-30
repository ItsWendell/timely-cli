import TimelyAPI from '../../client';

module.exports = {
	command: 'timer stop',
	describe: 'Stop any running timer for today',
	builder: {},
	handler: async (args) => {
		TimelyAPI.authenticate().then(async () => {
			TimelyAPI.stopTimer().then((event) => {
				console.log('Succesfully stopped timer for', event.note);
			}).catch((error) => {
				console.log('Something went wrong', error);
			})
		});
	}
};
