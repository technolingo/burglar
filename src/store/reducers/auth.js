import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utilities';

const initialState = {
  userID: null,
  token: null,
  error: null,
  loading: false
}

const authSuccess = (state, action) => (
  updateObject(state, {
    userID: action.userID,
    token: action.token,
    error: null,
    loading: false
}));

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return updateObject(state, {error: null, loading: true});
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILURE: return updateObject(state, {error: action.error, loading: false});
    default: return state;
  }
}

export default reducer;
