import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import todo from './todo';
import user from './user';

export const reducers = combineReducers({ 
    form: formReducer,
    todo,
    user
});
