import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utilities/utilities';

export const initialState = {
  userID: null,
  token: null,
  email: null,
  error: null,
  loading: false
}

const authSuccess = (state, action) => (
  updateObject(state, {
    userID: action.userID,
    token: action.token,
    email: action.email,
    error: null,
    loading: false
}));

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return updateObject(state, {error: null, loading: true});
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILURE: return updateObject(state, {error: action.error, loading: false});
    case actionTypes.AUTH_LOGOUT: return updateObject(state, {token: null, userID: null, email: null});
    default: return state;
  }
}

export default reducer;
