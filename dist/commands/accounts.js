'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _command2.default('accounts', 'Select a account for current session', function () {}, function () {
	_client2.default.selectAccount();
});

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