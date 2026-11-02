// Install: npm install mongoose
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a task description'],
        trim: true,
        maxlength: [100, 'Task cannot be more than 100 characters']
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    // In a real app, you would link this to a User model
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema);

export default Task;

//username-todo_user_1 Password-NDz4wKVfQUVe5lFm