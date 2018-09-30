'use strict';

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	command: 'accounts',
	describe: 'Select a account for current session',
	builder: {},
	hanlder: function hanlder() {
		_client2.default.selectAccount();
	}
};

/*
app
	.command('logout', 'Clear your session')
	.alias('signout')
	.action(function (args, callback) {
		TimelyAPI.logout().then(() => {
			callback();
		});
	});
*/