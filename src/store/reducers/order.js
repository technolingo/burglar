import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utilities';

const initalState = {
  orders: [],
  loading: false,
  purchased: false
}

const burgerPurchaseSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderID
  };
  return {
    ...state,
    loading: false,
    // redirect user away from billing page after purchase
    purchased: true,
    orders: state.orders.concat(newOrder)
  };
};

const reducer = (state=initalState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return updateObject(state, {purchased: false});
    case actionTypes.BURGER_PURCHASE_START: return updateObject(state, {loading: true});
    case actionTypes.BURGER_PURCHASE_SUCCESS: return burgerPurchaseSuccess(state, action);
    case actionTypes.BURGER_PURCHASE_FAILURE: return updateObject(state, {loading: false});
    case actionTypes.FETCH_ORDERS_START: return updateObject(state, {loading: true});
    case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, {orders: action.orders, loading: false});
    case actionTypes.FETCH_ORDERS_FAILURE: return updateObject(state, {loading: false});
    default: return state;
  }
}

export default reducer;
