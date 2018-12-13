import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from 'actions/user';


const initialState = {
  isLoggingIn: false,
  isAuthenticated: false,
  // hash: null,
  // name: null
};

export default function user(user = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...user,
        isLoggingIn: true
      };

    case LOGIN_SUCCESS:
      return {
        ...user,
        isLoggingIn: false,
        isAuthenticated: true,
        hash: action.payload.hash,
        username: action.payload.username
      };

    case LOGIN_FAILURE:
      return {
        ...user,
        isLoggingIn: false,
        isAuthenticated: false,
        error: action.payload.error
      };

    default:
      return user;
  }
}