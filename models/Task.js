const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: [true, 'Please add a task name'],
        trim: true,
        maxlength: [20, 'Task name cannot be more than 20 characters']
    },
    task_description: {
        type: String,
        required: [true, 'Please add a task description'],
        trim: true,
        maxlength: [500, 'Task description cannot be more than 500 characters']
    },
    completed_status: {
        type:Boolean,
        default:false   
    }
})

module.exports = mongoose.model('Task', TaskSchema)