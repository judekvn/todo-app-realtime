import { GET_ALL_TODO, UPDATE_TODO, DELETE_TODO, ADD_TODO, UPDATE_TODO_STATUS } from '../constants/actionTypes';
import { toast } from 'react-toastify';
import * as api from '../api/index.js';

export const getAllTodo = (history) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      history.push('/')
      return false;
    }
    const { data } = await api.getAllTodo(token);

    dispatch({ type: GET_ALL_TODO, payload: data.data });

  } catch (err) {
    console.log(err.message);
  }
};

export const addTodoSocket = (socket, name, userName, userId) => {
  return (dispatch) => {
    let socketData = {
      name,
      status: 'inprogress',
      completed: false,
      userName,
      userId
    }
    socket.emit('addTodo', socketData)
  }
}


export const addTodo = (data) => async (dispatch) => {
  try {

    dispatch({ type: ADD_TODO, payload: data });
    toast('Todo added successfully')

  } catch (err) {
    console.log(err.message);
  }
};

export const deleteTodoSocket = (socket, todoId) => {
  return (dispatch) => {
    let socketData = {
      todoId
    }
    socket.emit('deleteTodo', socketData)
  }
}

export const deleteTodo = (data) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TODO, payload: data });
    toast('Todo deleted successfully')

  } catch (err) {
    console.log(err.message);
  }
};

export const changeStatusTodo = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TODO_STATUS, payload: data });
    toast('Todo status updated successfully')

  } catch (err) {
    console.log(err.message);
  }
};

export const changeStatusTodoSocket = (socket, todoId, status) => {
  return (dispatch) => {
    let socketData = {
      todoId,
      status
    }
    socket.emit('changeStatusTodo', socketData)
  }
}

export const updateTodoSocket = (socket, todoId, name) => {
  return (dispatch) => {
    let socketData = {
      todoId,
      name
    }
    socket.emit('updateTodos', socketData)
  }
}

export const updateTodo = (data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TODO, payload: data });
    toast('Todo updated successfully')

  } catch (err) {
    console.log(err.message);
  }
};
