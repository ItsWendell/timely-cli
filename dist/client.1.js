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

var TimelyClient = function (_TimelyAPI) {
	(0, _inherits3.default)(TimelyClient, _TimelyAPI);

	function TimelyClient() {
		(0, _classCallCheck3.default)(this, TimelyClient);

		var _this = (0, _possibleConstructorReturn3.default)(this, (TimelyClient.__proto__ || (0, _getPrototypeOf2.default)(TimelyClient)).call(this, process.env.TIMELY_APP_ID, process.env.TIMELY_APP_SECRET));

		_this.tokens = {};
		_this.accountId = null;
		_this.accounts = {};
		return _this;
	}

	(0, _createClass3.default)(TimelyClient, [{
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
								return _nodePersist2.default.getItem('accountId');

							case 5:
								this.accountId = _context.sent;
								_context.next = 8;
								return _nodePersist2.default.getItem('tokens');

							case 8:
								this.tokens = _context.sent;

								if (this.tokens) {
									this.auth.accessToken.create(this.accessTokens);
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
		key: 'setProjectId',
		value: function setProjectId(id) {
			_nodePersist2.default.setItem('projectId', id);
			this.activeProjectId = id;
		}
	}, {
		key: 'setAccountId',
		value: function setAccountId(id) {
			_nodePersist2.default.setItem('accountId', id);
			this.activeAccountId = id;
		}
	}, {
		key: 'saveTokens',
		value: function saveTokens() {
			_nodePersist2.default.setItem('tokens', this.accessTokens.token);
		}
	}, {
		key: 'authenticate',
		value: function authenticate() {
			var _this2 = this;

			return new _promise2.default(function () {
				var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(resolve, reject) {
					var tokens;
					return _regenerator2.default.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.next = 2;
									return _nodePersist2.default.getItem('tokens');

								case 2:
									tokens = _context3.sent;

									if (tokens) {
										_context3.next = 6;
										break;
									}

									reject(new Error('Tokens not found'));
									return _context3.abrupt('return');

								case 6:

									_this2.accessTokens = _this2.auth.accessToken.create(tokens);
									if (_this2.accessTokens.expired()) {
										console.log('Tokens expired, renewing');
										_this2.accessTokens.refresh().then(function () {
											var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(tokens) {
												return _regenerator2.default.wrap(function _callee2$(_context2) {
													while (1) {
														switch (_context2.prev = _context2.next) {
															case 0:
																_this2.accessTokens = tokens;
																_this2.saveTokens();
																_this2.setApiHeaders();
																resolve();

															case 4:
															case 'end':
																return _context2.stop();
														}
													}
												}, _callee2, _this2);
											}));

											return function (_x3) {
												return _ref3.apply(this, arguments);
											};
										}()).catch(function (error) {
											reject(error);
										});
									} else {
										_this2.setApiHeaders();
										resolve();
									}

								case 8:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, _this2);
				}));

				return function (_x, _x2) {
					return _ref2.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'logout',
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_nodePersist2.default.clear();
								this.setAccountId(null);
								this.setProjectId(null);
								this.accessTokens = null;

							case 4:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function logout() {
				return _ref4.apply(this, arguments);
			}

			return logout;
		}()
	}, {
		key: 'setApiHeaders',
		value: function setApiHeaders() {
			_http.api.updateAccessToken(this.accessTokens.token.access_token);
		}
	}, {
		key: 'authorize',
		value: function authorize(code) {
			var _this3 = this;

			return new _promise2.default(function (resolve, reject) {
				_this3.auth.authorizationCode.getToken({
					code: code,
					redirect_uri: 'urn:ietf:wg:oauth:2.0:oob'
				}).then(function (tokens) {
					_this3.accessTokens = _this3.auth.accessToken.create(tokens);
					console.log('Succesfully logged in!', _this3.accessTokens.token);
					_this3.saveTokens();
					resolve();
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}, {
		key: 'getAccounts',
		value: function getAccounts() {
			var _this4 = this;

			return new _promise2.default(function () {
				var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(resolve, reject) {
					var _ref6, accounts;

					return _regenerator2.default.wrap(function _callee5$(_context5) {
						while (1) {
							switch (_context5.prev = _context5.next) {
								case 0:
									_context5.prev = 0;
									_context5.next = 3;
									return _this4.authenticate();

								case 3:
									_context5.next = 5;
									return _http.api.get('/accounts');

								case 5:
									_ref6 = _context5.sent;
									accounts = _ref6.data;

									accounts.forEach(function (account) {
										_this4.accounts[account.id] = account;
										_this4.accounts[account.id].projects = {};
									});
									resolve(_this4.accounts);
									_context5.next = 14;
									break;

								case 11:
									_context5.prev = 11;
									_context5.t0 = _context5['catch'](0);

									reject(_context5.t0);

								case 14:
								case 'end':
									return _context5.stop();
							}
						}
					}, _callee5, _this4, [[0, 11]]);
				}));

				return function (_x4, _x5) {
					return _ref5.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'selectAccount',
		value: function selectAccount() {
			var _this5 = this;

			this.getAccounts().then(function (accounts) {
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
				}).then(function (_ref7) {
					var accountId = _ref7.accountId;

					_this5.setAccountId(accountId);
				});
			}).catch(function (response) {
				console.log('error', response);
			});
		}
	}, {
		key: 'getCurrentAccountName',
		value: function getCurrentAccountName() {
			if (this.activeAccountId && this.accounts[this.activeAccountId]) {
				return this.accounts[this.activeAccountId].name;
			}
			return undefined;
		}
	}, {
		key: 'getCurrentUser',
		value: function getCurrentUser() {
			return _http.api.get('/' + this.activeAccountId + '/users/current');
		}
	}, {
		key: 'getProjects',
		value: function getProjects() {
			var _this6 = this;

			return new _promise2.default(function () {
				var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(resolve, reject) {
					var _ref9, projects;

					return _regenerator2.default.wrap(function _callee6$(_context6) {
						while (1) {
							switch (_context6.prev = _context6.next) {
								case 0:
									_context6.prev = 0;
									_context6.next = 3;
									return _http.api.get('/' + _this6.account.id + '/projects');

								case 3:
									_ref9 = _context6.sent;
									projects = _ref9.data;

									projects.forEach(function (project) {
										_this6.accounts[_this6.activeAccountId].projects[project.id] = project;
									});
									resolve(_this6.accounts[_this6.activeAccountId].projects);
									_context6.next = 12;
									break;

								case 9:
									_context6.prev = 9;
									_context6.t0 = _context6['catch'](0);

									reject(_context6.t0);

								case 12:
								case 'end':
									return _context6.stop();
							}
						}
					}, _callee6, _this6, [[0, 9]]);
				}));

				return function (_x6, _x7) {
					return _ref8.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'getEntries',
		value: function getEntries(date) {
			var _this7 = this;

			var endDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			return new _promise2.default(function () {
				var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(resolve, reject) {
					var entries, _ref11, _entries;

					return _regenerator2.default.wrap(function _callee7$(_context7) {
						while (1) {
							switch (_context7.prev = _context7.next) {
								case 0:
									_context7.prev = 0;
									entries = {};

									if (endDate) {
										_context7.next = 9;
										break;
									}

									_context7.next = 5;
									return _http.api.get('/' + _this7.account.id + '/events', {
										params: {
											day: (0, _moment2.default)(date).format(_moment2.default.HTML5_FMT.DATE)
										}
									});

								case 5:
									_ref11 = _context7.sent;
									_entries = _ref11.data;


									_entries.forEach(function (entry) {
										_entries[entry.id] = entry;
									});
									resolve(_entries);

								case 9:
									_context7.next = 14;
									break;

								case 11:
									_context7.prev = 11;
									_context7.t0 = _context7['catch'](0);

									reject(_context7.t0);

								case 14:
								case 'end':
									return _context7.stop();
							}
						}
					}, _callee7, _this7, [[0, 11]]);
				}));

				return function (_x9, _x10) {
					return _ref10.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'account',
		get: function get() {
			if (this.activeAccountId && this.accounts[this.activeAccountId]) {
				return this.accounts[this.activeAccountId];
			}
		}
	}, {
		key: 'project',
		get: function get() {
			if (this.activeProjectId && this.accounts[this.activeAccountId] && this.accounts[this.activeAccountId].projects[this.activeProjectId]) {
				return this.accounts[this.activeAccountId].projects[this.activeProjectId];
			}
			return undefined;
		}
	}]);
	return TimelyClient;
}(_timelyApi2.default);

exports.default = new _timelyApi2.default();