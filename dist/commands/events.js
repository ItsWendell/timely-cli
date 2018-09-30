'use strict';

module.exports = {
	command: 'events <command>',
	describe: 'Control events within Timely',
	builder: function builder(_ref) {
		var commandDir = _ref.commandDir;

		return commandDir('events');
	},
	handler: function handler() {}
};