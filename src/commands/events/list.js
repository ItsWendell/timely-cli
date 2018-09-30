import moment from 'moment';
import chrono from 'chrono-node';
import CLITable from 'cli-table';
import TimelyAPI from '../../client';

module.exports = {
	command: 'list [date] [enddate]',
	describe: 'Show entries of a specific date or range. defaults to today.',
	builder: {},
	handler: (args) => {
		let date = new Date();
		if (args.date) {
			date = chrono.parseDate(args.date);
		}

		if (!date) {
			console.log(`We tried hard but ${args.date} is an invalid date.`);
		}
		TimelyAPI.getEvents(date).then((entries) => {
			if (!entries.length) {
				console.log('There are no entries for', moment(date).format(moment.HTML5_FMT.DATE));
			}
			const table = new CLITable({
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
		});
	},
};
