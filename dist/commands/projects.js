'use strict';

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.command('projects', 'The accounts projects').alias('projects list').action(function (args, callback) {
	var _this = this;

	_client2.default.getProjects().then(function (projects) {
		var choices = (0, _values2.default)(projects).map(function (project) {
			return {
				name: project.name,
				value: project.id
			};
		});
		_this.prompt({
			type: 'autocomplete',
			name: 'projectId',
			message: 'Select a project to use',
			choices: choices
		}).then(function (_ref) {
			var projectId = _ref.projectId;

			_client2.default.activeProjectId = projectId;
			_app2.default.delimiter('~ Timely/' + _client2.default.account.name + '/' + _client2.default.project.name + '>');
			callback();
		});
	});
});