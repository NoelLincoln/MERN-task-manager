import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a document in MongoDB.
export interface ITask extends Document {
  task_name: string;
  task_description: string;
  completed_status: boolean;
}

// Create a Schema corresponding to the document interface.
const TaskSchema: Schema = new Schema({
  task_name: {
    type: String,
    required: [true, 'Please add a task name'],
    trim: true,
    maxlength: [20, 'Task name cannot be more than 20 characters'],
  },
  task_description: {
    type: String,
    required: [true, 'Please add a task description'],
    trim: true,
    maxlength: [500, 'Task description cannot be more than 500 characters'],
  },
  completed_status: {
    type: Boolean,
    default: false,
  },
});

// Create a Mongoose model from the schema.
const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
