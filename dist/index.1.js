'use strict';

require('dotenv/config');

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _timely = require('./timely');

var _timely2 = _interopRequireDefault(_timely);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _vorpal2.default)();

_nodePersist2.default.init();

var path = {
    accountId: null,
    projectId: null
};

_timely2.default.authenticate().then(function () {
    console.log('Welcome back to the Timely CLI!');
    selectAccount();
}).catch(function () {
    console.log("You're not logged in Timely yet!");
    app.command('login', 'Log into Timely').alias('auth').action(function (args, callback) {
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
    prompt();
});

var selectAccount = function selectAccount() {
    var login = app.find('login');
    if (login) login.remove();

    if (!_timely2.default.activeAccountId) {
        app.command('account', 'Select a timely account').action(function (args, callback) {
            var _this = this;

            var self = this;
            _timely2.default.getAccounts().then(function (accounts) {
                var choices = Object.values(accounts).map(function (account) {
                    return {
                        name: account.name,
                        value: account.id
                    };
                });
                _this.prompt({
                    type: 'list',
                    name: 'accountId',
                    message: 'Select a account to use',
                    choices: choices
                }).then(function (_ref2) {
                    var accountId = _ref2.accountId;

                    _timely2.default.activeAccountId = accountId;
                    app.delimiter('~ Timely/' + _timely2.default.accounts[accountId].name + ' >');
                    registerAccountCommands();
                    callback();
                });
            });
        });
        prompt();
    }
};

function registerAccountCommands() {
    app.command('me', 'Your account details').action(function (args, callback) {
        _timely2.default.getCurrentUser().then(function (_ref3) {
            var user = _ref3.data;

            console.log('You\'re ' + user.name + ' (' + user.email + ') at ' + _timely2.default.getCurrentAccountName());
            callback();
        });
    });

    app.command('projects', 'The accounts projects').action(function (args, callback) {
        var _this2 = this;

        _timely2.default.getProjects().then(function (projects) {
            var choices = Object.values(projects).map(function (project) {
                return {
                    name: project.name,
                    value: project.id
                };
            });
            _this2.prompt({
                type: 'list',
                name: 'projectId',
                message: 'Select a project to use',
                choices: choices
            }).then(function (_ref4) {
                var projectId = _ref4.projectId;

                _timely2.default.activeProjectId = projectId;
                app.delimiter('~ Timely/' + _timely2.default.account.name + '/' + _timely2.default.project.name + '>');
                callback();
            });
        });
    });
}

app.command('storage', 'List your timely accounts').action(function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args, callback) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.t0 = console;
                        _context.next = 3;
                        return _nodePersist2.default.values();

                    case 3:
                        _context.t1 = _context.sent;

                        _context.t0.log.call(_context.t0, _context.t1);

                        callback();

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2) {
        return _ref5.apply(this, arguments);
    };
}());

var prompt = function prompt() {
    app.delimiter('~Timely >').show();
};
//# sourceMappingURL=index.1.js.map