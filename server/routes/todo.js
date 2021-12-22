import express from 'express';
import { getAllTodo } from '../controllers/todo.js';
import { auth } from '../controllers/auth'

const router = express.Router();

router.get('/', auth, getAllTodo);

export default router;