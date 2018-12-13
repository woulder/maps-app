import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from 'reducers/user';
import markersReducer from 'reducers/markers';

const reducer = combineReducers({
  user: userReducer,
  markers: markersReducer,
  router: routerReducer
});

export default reducer;