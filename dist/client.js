'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _simpleOauth = require('simple-oauth2');

var _simpleOauth2 = _interopRequireDefault(_simpleOauth);

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

var _events = require('events');

var _url = require('url');

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _http = require('./http');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _timelyApi = require('./providers/timely-api');

var _timelyApi2 = _interopRequireDefault(_timelyApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Client = function () {
	function Client() {
		(0, _classCallCheck3.default)(this, Client);

		this.api = new _timelyApi2.default(process.env.TIMELY_APP_ID, process.env.TIMELY_APP_SECRET);
		this.tokens = {};
		this.account = null;
		this.accounts = {};
	}

	(0, _createClass3.default)(Client, [{
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
								_context.next = 5;
								return _nodePersist2.default.getItem('account');

							case 5:
								this.account = _context.sent;
								_context.next = 8;
								return _nodePersist2.default.getItem('tokens');

							case 8:
								this.tokens = _context.sent;

								if (this.tokens) {
									this.api.setTokens(this.tokens);
								}
								_context.next = 15;
								break;

							case 12:
								_context.prev = 12;
								_context.t0 = _context['catch'](0);

								console.log('Error loading states', _context.t0.message);

							case 15:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 12]]);
			}));

			function initialize() {
				return _ref.apply(this, arguments);
			}

			return initialize;
		}()
	}, {
		key: 'saveAccount',
		value: function saveAccount(account) {
			_nodePersist2.default.setItem('account', account);
			this.account = account;
		}
	}, {
		key: 'saveTokens',
		value: function saveTokens(tokens) {
			this.api.setTokens(tokens);
			_nodePersist2.default.setItem('tokens', tokens);
		}
	}, {
		key: 'authenticate',
		value: function authenticate() {
			var _this = this;

			var api = this.api;

			return new _promise2.default(function (resolve, reject) {
				api.authenticate(_this.tokens).then(function () {
					if (!_this.account) {
						_this.selectAccount().then(function () {
							resolve(_this.account);
						}).catch(function (error) {
							return reject(error);
						});
					} else {
						resolve(_this.account);
					}
				}).catch(function (error) {
					console.log('Preload error', error);
					console.log('Login with Timely: ', api.authorizeURL());
					_inquirer2.default.prompt([{
						name: 'authCode',
						message: 'Authorization code: '
					}]).then(function (_ref2) {
						var authCode = _ref2.authCode;

						api.authorize(authCode).then(function (tokens) {
							_this.saveTokens(tokens);
							_this.selectAccount().then(function (account) {
								resolve(account);
							});
						}).catch(function (error) {
							reject(error);
						});
					});
				});
			});
		}
	}, {
		key: 'logout',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_nodePersist2.default.clear();

							case 1:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function logout() {
				return _ref3.apply(this, arguments);
			}

			return logout;
		}()
	}, {
		key: 'selectAccount',
		value: function selectAccount() {
			var _this2 = this;

			var api = this.api;

			return new _promise2.default(function (resolve, reject) {
				api.getAccounts().then(function (accounts) {
					console.log('accounts', accounts);
					var choices = (0, _values2.default)(accounts).map(function (account) {
						return {
							name: account.name,
							value: account.id
						};
					});
					_inquirer2.default.prompt({
						type: 'list',
						name: 'accountId',
						message: 'Select a account to use',
						choices: choices
					}).then(function (_ref4) {
						var accountId = _ref4.accountId;

						var account = accounts.filter(function (account) {
							return account.id === accountId;
						})[0];
						_this2.saveAccount(account);

						resolve(account);
					});
				}).catch(function (response) {
					reject(response);
				});
			});
		}
	}, {
		key: 'getUser',
		value: function getUser() {
			return this.api.getUser(this.account.id);
		}
	}, {
		key: 'getProjects',
		value: function getProjects() {
			return this.api.getProjects(this.account.id);
		}
	}, {
		key: 'startTimer',
		value: function startTimer(eventId) {
			return this.api.startTimer(this.account.id, eventId);
		}
	}, {
		key: 'createEvent',
		value: function createEvent(projectId) {
			var day = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
			var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
			var hours = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
			var note = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

			return this.api.createEvent(this.account.id, projectId, day, minutes, hours, note);
		}
	}]);
	return Client;
}();

exports.default = new Client();