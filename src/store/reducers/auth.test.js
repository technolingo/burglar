import reducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state if receives an undefined action type', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store token in Redux state upon login', () => {
    expect(reducer(undefined, {
      type: actionTypes.AUTH_SUCCESS,
      userID: 'fakeUserID1234',
      token: 'fakeAuthToken1234',
      email: 'hello@example.com'
    })).toEqual({
      ...initialState,
      userID: 'fakeUserID1234',
      token: 'fakeAuthToken1234',
      email: 'hello@example.com'
    })
  });
});
