import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.BURGER_PURCHASE_SUCCESS,
  orderID: id,
  orderData: orderData
});

export const purchaseBurgerFailure = error => ({
  type: actionTypes.BURGER_PURCHASE_FAILURE,
  error: error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.BURGER_PURCHASE_START
});

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    // dispatch the above action to set loading to true
    dispatch(purchaseBurgerStart());
    // excute async code to save order data
    axios.post('/orders.json?auth=' + token, orderData)
      .then(r => {
        dispatch(purchaseBurgerSuccess(r.data.name, orderData));
      })
      .catch(e => {
        dispatch(purchaseBurgerFailure(e));
      });
  };
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
});

export const fetchOrdersFailure = error => ({
  type: actionTypes.FETCH_ORDERS_FAILURE,
  error: error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userID) => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    const queryParams = '?auth=' + token + '&orderBy="userID"&equalTo="' + userID + '"';
    axios.get('/orders.json' + queryParams)
      .then(r => {
        const fetchedOrders = [];
        for (let key in r.data) {
          fetchedOrders.push({
            ...r.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(e => {
        dispatch(fetchOrdersFailure(e));
      });
  };
};
