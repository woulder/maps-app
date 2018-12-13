import {
  ADD_MARKER,
  SAVE_MARKERS_REQUEST,
  SAVE_MARKERS_SUCCESS,
  SAVE_MARKERS_ERROR,
  GET_MARKERS_REQUEST,
  GET_MARKERS_SUCCESS,
  GET_MARKERS_ERROR
} from 'actions/markers';


const initialState = {
  collection: [],
  isSyncing: false
};

export default function markers(markers = initialState, action) {
  switch (action.type) {
    case ADD_MARKER:
      return {
        ...markers,
        collection: [...markers.collection, action.payload]
      };

    case SAVE_MARKERS_REQUEST:
      return {
        ...markers,
        isSyncing: true
      };

    case SAVE_MARKERS_SUCCESS:
      return {
        ...markers,
        collection: markers.collection.filter(({ _id }) => _id).concat(action.payload),
        isSyncing: false
      };

    case SAVE_MARKERS_ERROR:
      return {
        ...markers,
        isSyncing: false
      };

    case GET_MARKERS_REQUEST:
      return {
        ...markers,
        isSyncing: true
      };

    case GET_MARKERS_SUCCESS:
      return {
        ...markers,
        collection: markers.collection.filter(({ _id }) => !_id).concat(action.payload),
        isSyncing: false
      };

    case GET_MARKERS_ERROR:
      return {
        ...markers,
        isSyncing: false
      };

    default:
      return markers;
  }
}