'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _timely = require('../timely');

var _timely2 = _interopRequireDefault(_timely);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _vorpal2.default().command('login', 'Log into Timely').alias('auth').action(function (args, callback) {
	console.log('Login with Timely: ', _timely2.default.authorizeURL());
	this.prompt([{
		name: 'token',
		message: 'Authorization code: '
	}]).then(function (_ref) {
		var token = _ref.token;

		_timely2.default.authorize(token).finally(function () {
			registerCommands();
			callback();
		});
	});
});
//# sourceMappingURL=auth.js.map