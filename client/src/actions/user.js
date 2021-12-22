import { GET_USER, USER_LOGOUT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER, payload: user });
    } catch (err) {
        console.log(err.message);
    }
};
export const getUserData = (history) => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            history.push('/');
            return false;
        }
        const { data } = await api.getUser(token);        

        dispatch({ type: GET_USER, payload: data.data });
    } catch (err) {
        console.log(err.message);
    }
};

export const userLogout = () => async (dispatch) => {
    try {
        localStorage.removeItem('auth-token');
        dispatch({ type: USER_LOGOUT });
    } catch (err) {
        console.log(err.message);
    }
};