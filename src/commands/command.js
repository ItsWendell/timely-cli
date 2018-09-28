export default class Command {
	constructor(command, describe = false, builder = () => { }, handler = () => { }) {
		this.command = command;
		this.describe = describe;
		this.builder = builder;
		this.handler = handler;
	}

	setDescription(description) {
		this.describe = description;
	}

	setBuilder(func) {
		this.builder = func;
	}

	setHandler(func) {
		this.handler = func;
	}
}
