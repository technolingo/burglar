import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class Orders extends Component {

  componentDidMount () {
    this.props.onFetchOrders(this.props.token, this.props.userID);
  }

  render () {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = null;
      if (this.props.orders) {
        orders = this.props.orders.map(order => (
          <Order key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ));
      } // if fetched orders
    } // if not loading

    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userID: state.auth.userID
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userID) => dispatch(actions.fetchOrders(token, userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
