const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({ // content, time, isDone
	content: String,
	time: Date,
	isDone: Boolean
});

module.exports = mongoose.model("Task", TaskSchema);