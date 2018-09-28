'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

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

exports.default = new _command2.default('events create [note] [duration] [date]', 'Create a timely entry', function () {}, function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(args) {
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_client2.default.authenticate().then((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
							return _regenerator2.default.wrap(function _callee$(_context) {
								while (1) {
									switch (_context.prev = _context.next) {
										case 0:
											_client2.default.getProjects().then(function (projects) {
												var list = projects.map(function (project) {
													return project.name;
												});
												_inquirer2.default.prompt([{
													type: 'autocomplete',
													name: 'projectName',
													message: 'Choose a project',
													source: function source(answers, input) {
														var search = input || '';
														return new _promise2.default(function (resolve) {
															var results = _fuzzy2.default.filter(search, list);
															return resolve(results.map(function (result) {
																return result.string;
															}));
														});
													},
													transformer: function transformer(projectName) {
														return;
													}
												}, {
													type: 'input',
													name: 'note',
													message: 'Choose a note for this entry?',
													when: !args.note
												}, {
													type: 'confirm',
													name: 'timer',
													message: 'Do you want to start a timer? (right now)',
													default: true
												}, {
													type: 'input',
													name: 'duration',
													message: 'Duration for this entry? (e.g 2:30)',
													when: function when(_ref3) {
														var timer = _ref3.timer;
														return !args.duration && !timer;
													}
												}, {
													type: 'input',
													name: 'date',
													message: 'Date of the entry?',
													when: function when(_ref4) {
														var timer = _ref4.timer;
														return !args.date && !timer;
													},
													default: (0, _moment2.default)().format(_moment2.default.HTML5_FMT.DATE), list: list
												}]).then(function (_ref5) {
													var projectName = _ref5.projectName,
													    note = _ref5.note,
													    timer = _ref5.timer,
													    duration = _ref5.duration,
													    date = _ref5.date;

													var projectId = projects.filter(function (project) {
														return project.name === projectName;
													})[0].id;
													// STEP 1, create event.
													var durationTime = duration ? duration.split(':', 2) : [];
													_client2.default.createEvent(projectId, date, durationTime[1] || 0, durationTime[0] || 0, note).then(function (event) {
														if (timer) {
															_client2.default.startTimer(event.id).then(function (event) {
																console.log('Timer started for', projectName);
															}).catch(function (error) {
																console.log('Whoops, we created a event but not a timer!', error);
															});
														} else {
															console.log('Sucessfully created the above event!');
														}
													}).catch(function (error) {
														console.log('whooppss somethin went wrong...', error);
													});
													// STEP 2, create timer now.


													console.log('results', projectId, note, timer, durationTime, date);
												}).catch(function (error) {
													return console.log('error', error);
												});
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

										case 1:
										case 'end':
											return _context.stop();
									}
								}
							}, _callee, undefined);
						})));

					case 1:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x) {
		return _ref.apply(this, arguments);
	};
}());

/*
app
	.command('entries list [date] [enddate]', 'Show entries of a specific date or range. defaults to today.')
	.action(function (args, callback) {
		let date = new Date();
		if (args.date) {
			date = chrono.parseDate(args.date);
		}

		if (!date) {
			console.log(`We tried hard but ${args.date} is an invalid date.`);
			return callback();
		}
		TimelyAPI.getEntries(date).then((entries) => {
			if (!entries.length) {
				console.log('There are no entries for', moment(date).format(moment.HTML5_FMT.DATE));
				return callback();
			}
			let table = new CLITable({
				head: ['Note', 'Time', 'Project'],
			});

			Object.values(entries).forEach((entry) => {
				table.push([
					entry.note,
					entry.duration.formatted,
					entry.project.name,
				]);
			});

			console.log(table.toString());
			callback();
		});
	});
*/