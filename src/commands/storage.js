import storage from 'node-persist';

module.exports = {
	command: 'storage',
	describe: 'Check the current localStorage',
	builder: ({ option }) => (
		option('clear', {
			alias: 'c',
			default: false,
			describe: 'Clear session and storage',
		})
	),
	handler: async (args) => {
		await storage.init();
		if (args.clear) {
			await storage.clear();
			console.log('Storage cleared!');
			return;
		}
		console.log(await storage.values(), await storage.keys());
	},
};
