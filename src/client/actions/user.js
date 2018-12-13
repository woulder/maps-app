import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload }); 
export const loginFailure = (payload) => ({ type: LOGIN_FAILURE, payload }); 

export const login = (username, password) => dispatch => {
  dispatch(loginRequest());

  const hash = window.btoa([username, password].join(':'));

  axios.post('/api/login', {}, {
    headers: { 'Authorization': `Basic ${hash}` }
  })
  .then(response => {
    dispatch(loginSuccess({ ...response.data, hash }));
  })
  .catch((error) => {
    console.error.bind(error);
    alert('Error: Authorization');
    dispatch(loginFailure({ error }));
  });
};