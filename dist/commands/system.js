'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.command('storage', 'List your timely accounts').action(function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(args, callback) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.t0 = console;
						_context.next = 3;
						return _nodePersist2.default.values();

					case 3:
						_context.t1 = _context.sent;
						_context.next = 6;
						return _nodePersist2.default.keys();

					case 6:
						_context.t2 = _context.sent;

						_context.t0.log.call(_context.t0, _context.t1, _context.t2);

						callback();

					case 9:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());