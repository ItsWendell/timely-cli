'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.App = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

var _timely = require('./timely');

var _timely2 = _interopRequireDefault(_timely);

var _events = require('events');

var _inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt');

var _inquirerAutocompletePrompt2 = _interopRequireDefault(_inquirerAutocompletePrompt);

var _login = require('./commands/login');

var _login2 = _interopRequireDefault(_login);

var _accounts = require('./commands/accounts');

var _accounts2 = _interopRequireDefault(_accounts);

var _projects = require('./commands/projects');

var _projects2 = _interopRequireDefault(_projects);

var _entries = require('./commands/entries');

var _entries2 = _interopRequireDefault(_entries);

var _system = require('./commands/system');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = exports.App = function (_EventEmitter) {
	(0, _inherits3.default)(App, _EventEmitter);

	function App() {
		(0, _classCallCheck3.default)(this, App);

		var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this));

		_this.commander = (0, _vorpal2.default)();
		_this.commander.ui.inquirer.registerPrompt('autocomplete', _inquirerAutocompletePrompt2.default);

		_this.commander.use(_system2.default);
		return _this;
	}

	(0, _createClass3.default)(App, [{
		key: 'initialize',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return _nodePersist2.default.init();

							case 3:
								_context.next = 8;
								break;

							case 5:
								_context.prev = 5;
								_context.t0 = _context['catch'](0);

								console.error(_context.t0);

							case 8:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 5]]);
			}));

			function initialize() {
				return _ref.apply(this, arguments);
			}

			return initialize;
		}()
	}, {
		key: 'authenticate',
		value: function authenticate() {
			var _this2 = this;

			var commander = this.commander;


			_timely2.default.authenticate().then(function () {
				console.log('Welcome back to the Timely CLI!');
				commander.use(_accounts2.default);

				if (_timely2.default.account) {
					commander.use(_projects2.default);
					commander.use(_entries2.default);

					commander.delimiter(' ~Timely/' + _timely2.default.account.name + ' >');
				}
				commander.show();
			}).catch((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								console.log("You're not logged in Timely yet!");
								commander.use(_login2.default);
								commander.delimiter('').show();
								commander.exec('login').then(function () {
									commander.use(_accounts2.default);
									commander.exec('accounts select').then(function () {
										commander.use(_projects2.default);
										commander.show();
									});
								}).catch(function () {});
								// commander.show();

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this2);
			})));
		}
	}]);
	return App;
}(_events.EventEmitter);

exports.default = new App();