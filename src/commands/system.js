import storage from 'node-persist';
import app from '../app';

app
	.command('storage', 'List your timely accounts')
	.action(async function (args, callback) {
		console.log(await storage.values(), await storage.keys());
		callback();
	});
