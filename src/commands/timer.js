module.exports = {
	command: 'timer <command>',
	describe: 'Control timers within Timely',
	builder: (yargs) => {
		return yargs
			.commandDir('timer')
			.help();
	},
	handler: () => { },
};
