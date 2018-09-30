'use strict';

module.exports = {
	command: 'timer <command>',
	describe: 'Control timers within Timely',
	builder: function builder(yargs) {
		return yargs.commandDir('timer').help();
	},
	handler: function handler() {}
};