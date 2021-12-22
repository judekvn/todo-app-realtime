import mongoose from 'mongoose';

const todo = mongoose.Schema({
    name: { type: String },
    status: { type: String },
    userName: { type: String },
    userId: { type: String },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const Todo = mongoose.model('Todo', todo);

export default Todo;