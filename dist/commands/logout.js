'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (app, options) {
	app.command('logout', 'Clear your session').alias('signout').action(function (args, callback) {
		_timely2.default.logout().then(function () {
			callback();
		});
	});
};

var _timely = require('../timely');

var _timely2 = _interopRequireDefault(_timely);

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=logout.js.map