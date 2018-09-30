module.exports = {
	command: 'events <command>',
	describe: 'Control events within Timely',
	builder: ({ commandDir }) => {
		return commandDir('events');
	},
	handler: () => { },
};
