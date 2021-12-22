import { GET_ALL_TODO, ADD_TODO, UPDATE_TODO, DELETE_TODO, UPDATE_TODO_STATUS } from '../constants/actionTypes';

const todo = (state = [], action) => {
  switch (action.type) {

    case GET_ALL_TODO:
      return {
        ...state,
        todoList: action.payload
      }

    case ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload]
      }

    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((data) => data._id != action.payload)
      }

    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todoList: state.todoList.map((data) => data._id == action.payload.todoId ? { ...data, status: action.payload.status } : data)
      }

    case UPDATE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((data) => data._id == action.payload.todoId ? { ...data, name: action.payload.name } : data)
      }

    default:
      return state;
  }
};

export default todo;