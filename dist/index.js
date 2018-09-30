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

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt');

var _inquirerAutocompletePrompt2 = _interopRequireDefault(_inquirerAutocompletePrompt);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

initialize().then(function () {
	_yargs2.default.usage('Usage: $0 [options] [command]').version('v').alias('v', 'version').help('h').alias('h', 'help').epilog('Timely CLI - No more excuses!').commandDir('commands').demandCommand();
	_yargs2.default.argv;
});