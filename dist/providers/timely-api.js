'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _simpleOauth = require('simple-oauth2');

var _simpleOauth2 = _interopRequireDefault(_simpleOauth);

var _url = require('url');

var _http = require('../http');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIMELY_API_HOST = 'https://api.timelyapp.com/1.1/';

var TimelyAPI = function () {
	function TimelyAPI(appId, appSecret) {
		var redirectUri = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'urn:ietf:wg:oauth:2.0:oob';
		(0, _classCallCheck3.default)(this, TimelyAPI);

		var url = new _url.URL(TIMELY_API_HOST);
		this.credentials = {
			client: {
				id: appId,
				secret: appSecret
			},
			auth: {
				tokenHost: url.origin,
				tokenPath: url.pathname + '/oauth/token',
				revokePath: url.pathname + '/oauth/revoke',
				authorizePath: url.pathname + '/oauth/authorize'
			}
		};
		this.redirectUri = redirectUri;
		this.auth = _simpleOauth2.default.create(this.credentials);
		this.accessTokens = null;
	}

	/**
  * @returns {String} authorization Url
  */


	(0, _createClass3.default)(TimelyAPI, [{
		key: 'authorizeURL',
		value: function authorizeURL() {
			return this.auth.authorizationCode.authorizeURL({
				redirect_uri: this.redirectUri
			});
		}

		/**
   * Authenticate with specific accessTokens.
   *
   * @param {Object} tokens
   */

	}, {
		key: 'authenticate',
		value: function authenticate(tokens) {
			var _this = this;

			return new _promise2.default(function (resolve, reject) {
				if (!tokens) {
					reject();
					return;
				}

				_this.setTokens(tokens);

				if (_this.accessTokens.expired()) {
					_this.accessTokens.refresh().then(function (tokens) {
						console.log('refresh', tokens);
						_this.setTokens(tokens);
						resolve(tokens);
					}).catch(function (error) {
						reject(error);
					});
				} else {
					resolve(tokens);
				}
			});
		}

		/**
   * Removes saved accessToken in the session.
   */

	}, {
		key: 'logout',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								this.accessTokens = null;

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function logout() {
				return _ref.apply(this, arguments);
			}

			return logout;
		}()

		/**
   * Authorize with a authentication code.
   *
   * @param {String} code
   */

	}, {
		key: 'authorize',
		value: function authorize(code) {
			var _this2 = this;

			return new _promise2.default(function (resolve, reject) {
				_this2.auth.authorizationCode.getToken({
					code: code,
					redirect_uri: _this2.redirectUri
				}).then(function (tokens) {
					_this2.setTokens(tokens);
					resolve(tokens);
				}).catch(function (error) {
					reject(error);
				});
			});
		}

		/**
   * Returns all accounts connected to user of current class.
   *
   * @returns {Promise}
   */

	}, {
		key: 'getAccounts',
		value: function getAccounts() {
			var _this3 = this;

			return new _promise2.default(function () {
				var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve, reject) {
					var _ref3, accounts;

					return _regenerator2.default.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									_context2.prev = 0;
									_context2.next = 3;
									return _http.api.get('/accounts');

								case 3:
									_ref3 = _context2.sent;
									accounts = _ref3.data;

									resolve(accounts);
									_context2.next = 11;
									break;

								case 8:
									_context2.prev = 8;
									_context2.t0 = _context2['catch'](0);

									reject(_context2.t0);

								case 11:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, _this3, [[0, 8]]);
				}));

				return function (_x2, _x3) {
					return _ref2.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'getUser',
		value: function getUser(accountId) {
			var _this4 = this;

			var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'current';

			return new _promise2.default(function () {
				var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(resolve, reject) {
					var _ref5, user;

					return _regenerator2.default.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.prev = 0;
									_context3.next = 3;
									return _http.api.get('/' + accountId + '/users/' + id);

								case 3:
									_ref5 = _context3.sent;
									user = _ref5.data;

									resolve(user);
									_context3.next = 11;
									break;

								case 8:
									_context3.prev = 8;
									_context3.t0 = _context3['catch'](0);

									reject(_context3.t0);

								case 11:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, _this4, [[0, 8]]);
				}));

				return function (_x5, _x6) {
					return _ref4.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'setTokens',
		value: function setTokens(tokens) {
			this.accessTokens = this.auth.accessToken.create(tokens);
			_http.api.updateAccessToken(this.accessTokens.token.access_token);
		}
	}, {
		key: 'getProjects',
		value: function getProjects(accountId) {
			var _this5 = this;

			return new _promise2.default(function () {
				var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(resolve, reject) {
					var _ref7, projects;

					return _regenerator2.default.wrap(function _callee4$(_context4) {
						while (1) {
							switch (_context4.prev = _context4.next) {
								case 0:
									_context4.prev = 0;
									_context4.next = 3;
									return _http.api.get('/' + accountId + '/projects');

								case 3:
									_ref7 = _context4.sent;
									projects = _ref7.data;

									resolve(projects);
									_context4.next = 11;
									break;

								case 8:
									_context4.prev = 8;
									_context4.t0 = _context4['catch'](0);

									reject(_context4.t0);

								case 11:
								case 'end':
									return _context4.stop();
							}
						}
					}, _callee4, _this5, [[0, 8]]);
				}));

				return function (_x7, _x8) {
					return _ref6.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'getEvents',
		value: function getEvents(accountId) {
			var _this6 = this;

			var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
			var endDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			return new _promise2.default(function () {
				var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(resolve, reject) {
					var day, _ref9, events, _ref10, _events;

					return _regenerator2.default.wrap(function _callee5$(_context5) {
						while (1) {
							switch (_context5.prev = _context5.next) {
								case 0:
									day = date ? (0, _moment2.default)(date).format(_moment2.default.HTML5_FMT.DATE) : (0, _moment2.default)().format(_moment2.default.HTML5_FMT.DATE);
									_context5.prev = 1;

									if (endDate) {
										_context5.next = 10;
										break;
									}

									_context5.next = 5;
									return _http.api.get('/' + accountId + '/events', {
										params: {
											day: (0, _moment2.default)(date).format(_moment2.default.HTML5_FMT.DATE)
										}
									});

								case 5:
									_ref9 = _context5.sent;
									events = _ref9.data;

									resolve(events);
									_context5.next = 15;
									break;

								case 10:
									_context5.next = 12;
									return _http.api.get('/' + accountId + '/events', {
										params: {
											since: (0, _moment2.default)(date).format(_moment2.default.HTML5_FMT.DATE),
											upto: (0, _moment2.default)(endDate).format(_moment2.default.HTML5_FMT.DATE)
										}
									});

								case 12:
									_ref10 = _context5.sent;
									_events = _ref10.data;

									resolve(_events);

								case 15:
									_context5.next = 20;
									break;

								case 17:
									_context5.prev = 17;
									_context5.t0 = _context5['catch'](1);

									reject(_context5.t0);

								case 20:
								case 'end':
									return _context5.stop();
							}
						}
					}, _callee5, _this6, [[1, 17]]);
				}));

				return function (_x11, _x12) {
					return _ref8.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'createEvent',
		value: function createEvent(accountId, projectId) {
			var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
			var minutes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

			var _this7 = this;

			var hours = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
			var note = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

			return new _promise2.default(function () {
				var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(resolve, reject) {
					var _ref12, event;

					return _regenerator2.default.wrap(function _callee6$(_context6) {
						while (1) {
							switch (_context6.prev = _context6.next) {
								case 0:
									_context6.prev = 0;
									_context6.next = 3;
									return _http.api.post('/' + accountId + '/projects/' + projectId + '/events', {
										event: {
											day: (0, _moment2.default)(day).format(_moment2.default.HTML5_FMT.DATE),
											minutes: (0, _parseInt2.default)(minutes, 10),
											hours: (0, _parseInt2.default)(hours, 10),
											note: note
										}
									});

								case 3:
									_ref12 = _context6.sent;
									event = _ref12.data;


									resolve(event);
									_context6.next = 11;
									break;

								case 8:
									_context6.prev = 8;
									_context6.t0 = _context6['catch'](0);

									reject(_context6.t0);

								case 11:
								case 'end':
									return _context6.stop();
							}
						}
					}, _callee6, _this7, [[0, 8]]);
				}));

				return function (_x17, _x18) {
					return _ref11.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'startTimer',
		value: function startTimer(accountId, eventId) {
			var _this8 = this;

			return new _promise2.default(function () {
				var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(resolve, reject) {
					var _api$put, event;

					return _regenerator2.default.wrap(function _callee7$(_context7) {
						while (1) {
							switch (_context7.prev = _context7.next) {
								case 0:
									_context7.prev = 0;
									_api$put = _http.api.put('/' + accountId + '/events/' + eventId + '/start'), event = _api$put.data;
									return _context7.abrupt('return', event);

								case 5:
									_context7.prev = 5;
									_context7.t0 = _context7['catch'](0);

									reject(_context7.t0);

								case 8:
								case 'end':
									return _context7.stop();
							}
						}
					}, _callee7, _this8, [[0, 5]]);
				}));

				return function (_x19, _x20) {
					return _ref13.apply(this, arguments);
				};
			}());
		}
	}, {
		key: 'stopTimer',
		value: function stopTimer(accountId, eventId) {
			var _this9 = this;

			return new _promise2.default(function () {
				var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(resolve, reject) {
					var _api$put2, event;

					return _regenerator2.default.wrap(function _callee8$(_context8) {
						while (1) {
							switch (_context8.prev = _context8.next) {
								case 0:
									_context8.prev = 0;
									_api$put2 = _http.api.put('/' + accountId + '/events/' + eventId + '/stop'), event = _api$put2.data;
									return _context8.abrupt('return', event);

								case 5:
									_context8.prev = 5;
									_context8.t0 = _context8['catch'](0);

									reject(_context8.t0);

								case 8:
								case 'end':
									return _context8.stop();
							}
						}
					}, _callee8, _this9, [[0, 5]]);
				}));

				return function (_x21, _x22) {
					return _ref14.apply(this, arguments);
				};
			}());
		}
	}]);
	return TimelyAPI;
}();

exports.default = TimelyAPI;