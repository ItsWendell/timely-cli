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

exports.default = new _command2.default('login', 'Log into a Timely account', function () {}, function (argv) {
	_client2.default.authenticate().then(function (response) {
		console.log('Succesfully logged in at', response.name);
	});
});