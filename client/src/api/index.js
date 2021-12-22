import axios from 'axios';

const url = process.env.BACKEND_URL || 'http://localhost:4000/api';

export const userSignup = (user) => axios.post(url + '/user/signup', user);
export const userLogin = (user) => axios.post(url + '/user/login', user);
export const getUser = (token) => axios.get(url + '/user/get', { headers: { 'Authorization': token } });

export const getAllTodo = (token) => axios.get(url + '/todo', { headers: { 'Authorization': token } });