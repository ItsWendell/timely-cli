'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var initialize = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _client2.default.initialize();

					case 3:
						_context.next = 5;
						return _inquirer2.default.registerPrompt('autocomplete', _inquirerAutocompletePrompt2.default);

					case 5:
						_context.next = 10;
						break;

					case 7:
						_context.prev = 7;
						_context.t0 = _context['catch'](0);

						console.error(_context.t0);

					case 10:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 7]]);
	}));

	return function initialize() {
		return _ref.apply(this, arguments);
	};
}();

require('dotenv/config');

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _login = require('./commands/login');

var _login2 = _interopRequireDefault(_login);

var _whois = require('./commands/whois');

var _whois2 = _interopRequireDefault(_whois);

var _events = require('./commands/events');

var _events2 = _interopRequireDefault(_events);

var _inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt');

var _inquirerAutocompletePrompt2 = _interopRequireDefault(_inquirerAutocompletePrompt);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

initialize().then(function () {
	_yargs2.default
	// .usage('Usage: $0 <command> [options]')
	// .version('0.1.0')
	.epilog('Timely CLI - No more excuses!').help('help').alias('h', 'help');

	_yargs2.default.command(_login2.default).command(_whois2.default).command(_events2.default);

	/**
  * System commands for testing and evaluation purposes
  */
	_yargs2.default.command('storage', 'Check the current localStorage', function () {}, function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(args) {
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return _nodePersist2.default.init();

						case 2:
							if (!args.clear) {
								_context2.next = 7;
								break;
							}

							_context2.next = 5;
							return _nodePersist2.default.clear();

						case 5:
							console.log('Storage cleared!');
							return _context2.abrupt('return');

						case 7:
							_context2.t0 = console;
							_context2.next = 10;
							return _nodePersist2.default.values();

						case 10:
							_context2.t1 = _context2.sent;
							_context2.next = 13;
							return _nodePersist2.default.keys();

						case 13:
							_context2.t2 = _context2.sent;

							_context2.t0.log.call(_context2.t0, _context2.t1, _context2.t2);

						case 15:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined);
		}));

		return function (_x) {
			return _ref2.apply(this, arguments);
		};
	}()).option('clear', {
		alias: 'c',
		default: false
	});

	_yargs2.default.argv;
});