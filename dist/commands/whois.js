'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	command: 'whois',
	describe: 'Retrieve the current authenticated user and account.',
	builder: {},
	handler: function handler(argv) {
		var _this = this;

		_client2.default.authenticate().then((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var user, account;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _client2.default.getUser();

						case 2:
							user = _context.sent;
							account = _client2.default.account;


							console.log('You are logged in as ' + user.email + ' (' + user.name + ') @ ' + account.name);

						case 5:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))).catch(function (error) {
			console.log('You\'re not authenticated into an account.', error);
		});
	}
};