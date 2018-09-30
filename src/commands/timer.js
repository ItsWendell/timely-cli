module.exports = {
	command: 'timer <command>',
	describe: 'Control timers within Timely',
	builder: yargs => yargs
		.commandDir('timer')
		.help(),
	handler: () => { },
};
