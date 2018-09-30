module.exports = {
	command: 'events <command>',
	describe: 'Control events within Timely',
	builder: ({ commandDir }) => commandDir('events'),
	handler: () => { },
};
