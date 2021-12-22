import { GET_USER, USER_LOGOUT } from '../constants/actionTypes';

const user = (state = {}, action) => {
  switch (action.type) {

    case GET_USER:
      return {
        ...state,
        user: action.payload
      }

    case USER_LOGOUT:
      return {
        ...state,
        user: {}
      }

    default:
      return state;
  }
};

export default user;