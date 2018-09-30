'use strict';

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	command: 'login',
	describe: 'Log into a Timely account :D',
	builder: {},
	handler: function handler(argv) {
		_client2.default.authenticate().then(function (response) {
			console.log('Succesfully logged in at', response.name);
		});
	}
};