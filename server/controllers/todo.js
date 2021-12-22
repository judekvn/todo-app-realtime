import express from 'express';
import Todo from '../models/todo.js';

const router = express.Router();

export const getAllTodo = async (req, res) => {
    try {
        const todo = await Todo.find();

        res.status(200).json({ data: todo, success: true });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export const addTodo = async (socket, data) => {

    try {
        const { name, status, userName, userId } = data;

        const newTodo = new Todo({ name, status, userName, userId });

        await newTodo.save();

        socket.emit('todoAdded', newTodo);

    } catch (err) {
        console.log(err);
    }
}

export const updateTodo = async (socket, data) => {

    try {
        const { name, todoId } = data;

        const todoUpdate = await Todo.findByIdAndUpdate(todoId, {
            $set: {
                name
            }
        });

        if (todoUpdate) {
            socket.emit('todoUpdate', { todoId, name });
        }
    } catch (err) {
        console.log(err);
    }
}

export const deleteTodo = async (socket, data) => {

    try {
        const { todoId } = data;

        const todoExist = await Todo.findById(todoId);

        if (todoExist) {
            await Todo.deleteOne({ _id: todoExist._id })
            socket.emit('todoDelete', todoId);
        }
    } catch (err) {
        console.log(err);
    }
}

export const changeStatusTodo = async (socket, data) => {

    try {
        const { todoId, status } = data;

        const todoUpdate = await Todo.findByIdAndUpdate(todoId, {
            $set: {
                status
            }
        });

        if (todoUpdate) {
            socket.emit('todoStatusChange', { todoId, status });
        }
    } catch (err) {
        console.log(err);
    }
}

export default router;