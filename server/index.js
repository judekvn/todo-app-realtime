
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import { Server } from 'socket.io';
import http from 'http';

import user from './routes/user.js';
import todo from './routes/todo.js';
import { addTodo, updateTodo, deleteTodo, changeStatusTodo } from './controllers/todo';

dotenv.config({ path: '../.env' })
const app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use('/api/user', user);
app.use('/api/todo', todo);

const CONNECTION_URL = 'mongodb+srv://react-app:react-app@cluster0.0pknp.mongodb.net/react-app?retryWrites=true&w=majority';
const PORT = process.env.BACKEND_PORT || 4000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {cors: {origin: "*"}});

io.on('connection', (socket) => {
  console.log('Connection established');

  socket.on('addTodo', async (data) => {
    await addTodo(io, data)
  })

  socket.on('updateTodos', async (data) => {
    await updateTodo(io, data)
  })

  socket.on('deleteTodo', async (data) => {
    await deleteTodo(io, data)
  })

  socket.on('changeStatusTodo', async (data) => {
    await changeStatusTodo(io, data)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    httpServer.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
  })
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);