const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
	taskName: {
		type: String
	},
	taskPriority: {
		type: Number
	},
	taskTime: {
		type: String
	},
	taskStatus: {
		type: String
	},
	emailId: {
		type: String
	},
	createdAt: {
		type: String
	}
})

const Task = new mongoose.model('task', taskSchema);

module.exports = Task;