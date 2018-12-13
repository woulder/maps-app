import axios from 'axios';

export const ADD_MARKER = 'ADD_MARKER';

export const SAVE_MARKERS_REQUEST = 'SAVE_MARKERS_REQUEST';
export const SAVE_MARKERS_SUCCESS = 'SAVE_MARKERS_SUCCESS';
export const SAVE_MARKERS_ERROR = 'SAVE_MARKERS_ERROR';

export const GET_MARKERS_REQUEST = 'GET_MARKERS_REQUEST';
export const GET_MARKERS_SUCCESS = 'GET_MARKERS_SUCCESS';
export const GET_MARKERS_ERROR = 'GET_MARKERS_ERROR';

export const addMarker = (marker) => ({ type: ADD_MARKER, payload: marker });

export const saveMarkersRequest = () => ({ type: SAVE_MARKERS_REQUEST });
export const saveMarkersSuccess = (payload) => ({ type: SAVE_MARKERS_SUCCESS, payload });
export const saveMarkersError = () => ({ type: SAVE_MARKERS_ERROR });

export const getMarkersRequest = () => ({ type: GET_MARKERS_REQUEST });
export const getMarkersSuccess = (payload) => ({ type: GET_MARKERS_SUCCESS, payload });
export const getMarkersError = () => ({ type: GET_MARKERS_ERROR });

export const saveMarkers = (user, markers) => dispatch => {
  dispatch(saveMarkersRequest());

  axios.post('/api/markers', markers, {
    headers: { 'Authorization': `Basic ${user.hash}` }
  })
  .then((response) => {
    dispatch(saveMarkersSuccess(response.data));
  })
  .catch((error) => {
    console.error.bind(error);
    alert('Error: saving markers');
    dispatch(saveMarkersError({ error }));
  });
};

export const getMarkers = (user) => dispatch => {
  dispatch(getMarkersRequest());

  axios.get('/api/markers', {
    headers: { 'Authorization': `Basic ${user.hash}` }
  })
  .then((response) => {
    dispatch(getMarkersSuccess(response.data));
  })
  .catch((error) => {
    console.error.bind(error);
    alert('Error: getting markers');
    dispatch(getMarkersError({ error }));
  });
};