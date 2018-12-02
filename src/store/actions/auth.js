import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (userID, token, email) => ({
  type: actionTypes.AUTH_SUCCESS,
  userID: userID,
  token: token,
  email: email
});

export const authFailure = error => ({
  type: actionTypes.AUTH_FAILURE,
  error: error
});

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
  localStorage.removeItem('userID');
  localStorage.removeItem('email');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut())
    }, (expiresIn - 3) * 1000);
  }
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = '/signupNewUser?key=AIzaSyDRnrs9D5_1z4LErbHuvxSw6PtZCk3MeMM';
    if (!isSignUp) {
      url = '/verifyPassword?key=AIzaSyDRnrs9D5_1z4LErbHuvxSw6PtZCk3MeMM';
    }
    axios.post(url, authData)
      .then(r => {
        // store persistent login info
        const expirationDateTime = new Date(new Date().getTime() + (r.data.expiresIn - 3) * 1000);
        localStorage.setItem('token', r.data.idToken);
        localStorage.setItem('expiry', expirationDateTime);
        localStorage.setItem('userID', r.data.localId);
        localStorage.setItem('email', r.data.email);

        dispatch(authSuccess(r.data.localId, r.data.idToken, r.data.email));
        dispatch(checkAuthTimeout(r.data.expiresIn));
      })
      .catch(e => {
        dispatch(authFailure(e.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logOut());
    } else {
      // JavaScript Date objects are stored as strings in localStorage
      const expirationDateTime = new Date(localStorage.getItem('expiry'));
      if (expirationDateTime <= new Date()) {
        dispatch(logOut());
      } else {
        const userID = localStorage.getItem('userID');
        const email = localStorage.getItem('email');
        const expiresIn = (expirationDateTime.getTime() - new Date().getTime()) / 1000 - 2;
        dispatch(authSuccess(userID, token, email));
        dispatch(checkAuthTimeout(expiresIn));
      } // expiry check
    } // token check
  };
};
