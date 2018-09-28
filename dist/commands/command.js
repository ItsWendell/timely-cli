"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Command = function () {
	function Command(command) {
		var describe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var builder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
		var handler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
		(0, _classCallCheck3.default)(this, Command);

		this.command = command;
		this.describe = describe;
		this.builder = builder;
		this.handler = handler;
	}

	(0, _createClass3.default)(Command, [{
		key: "setDescription",
		value: function setDescription(description) {
			this.describe = description;
		}
	}, {
		key: "setBuilder",
		value: function setBuilder(func) {
			this.builder = func;
		}
	}, {
		key: "setHandler",
		value: function setHandler(func) {
			this.handler = func;
		}
	}]);
	return Command;
}();

exports.default = Command;