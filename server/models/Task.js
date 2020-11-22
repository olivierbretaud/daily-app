const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const TaskSchema  = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    user: {
        type: ObjectId,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default : Date.now
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;