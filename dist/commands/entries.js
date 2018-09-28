'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _timely = require('../timely');

var _timely2 = _interopRequireDefault(_timely);

var _inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt');

var _inquirerAutocompletePrompt2 = _interopRequireDefault(_inquirerAutocompletePrompt);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chronoNode = require('chrono-node');

var _chronoNode2 = _interopRequireDefault(_chronoNode);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _fuzzy = require('fuzzy');

var _fuzzy2 = _interopRequireDefault(_fuzzy);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _command2.default('entries create [note] [duration] [date]', 'Create a timely entry', function () {}, function (args) {
	_timely2.default.getProjects().then(function (result) {
		var projects = (0, _values2.default)(result).map(function (project) {
			return {
				name: project.name,
				value: project.id
			};
		});
		_inquirer2.default.prompt([{
			type: 'autocomplete',
			name: 'projectId',
			message: 'Select a project to use',
			source: function source(answers, input) {
				var search = input || '';
				return new _promise2.default(function (resolve) {
					var results = _fuzzy2.default.filter(search, projects, {
						extract: function extract(project) {
							return project.name;
						}
					});
					return resolve(results.map(function (result) {
						return result.string + ' -' + result.score;
					}));
				});
			}
		}]).then(function (results) {
			_yargs2.default.ui.redraw();
			console.log('results', results);
			callback(results);
		}).catch(function (test) {
			return console.log('error');
		});
		console.log('TEST TEST TEST');
		callback();
		/*
  this.prompt([, {
  	type: 'input',
  	name: 'note',
  	message: 'Choose a note for this entry?',
  	when: !args.note,
  }, {
  	type: 'confirm',
  	name: 'timer',
  	message: 'Do you want to start a timer? (right now)',
  	default: true,
  }, {
  	type: 'input',
  	name: 'duration',
  	message: 'Duration for this entry?',
  	when: ({ timer }) => !args.duration && !timer,
  }, {
  	type: 'input',
  	name: 'date',
  	message: 'Date of the entry?',
  	when: ({ timer }) => !args.date && !timer,
  	default: moment().format(moment.HTML5_FMT.DATE),
  }]).then(({ note, timer, duration, date }) => {
  	if (timer) {
  		console.error('Timer not supported yet!');
  		return callback(false);
  	}
  		console.log('Answers...', answers);
  	callback(answers);
  });
  */
	});
});


_yargs2.default.command('entries list [date] [enddate]', 'Show entries of a specific date or range. defaults to today.').action(function (args, callback) {
	var date = new Date();
	if (args.date) {
		date = _chronoNode2.default.parseDate(args.date);
	}

	if (!date) {
		console.log('We tried hard but ' + args.date + ' is an invalid date.');
		return callback();
	}
	_timely2.default.getEntries(date).then(function (entries) {
		if (!entries.length) {
			console.log('There are no entries for', (0, _moment2.default)(date).format(_moment2.default.HTML5_FMT.DATE));
			return callback();
		}
		var table = new _cliTable2.default({
			head: ['Note', 'Time', 'Project']
		});

		(0, _values2.default)(entries).forEach(function (entry) {
			table.push([entry.note, entry.duration.formatted, entry.project.name]);
		});

		console.log(table.toString());
		callback();
	});
});