import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null
  }

  // parseIngredientParams = () => {
  //   console.log(this.props);
  //
  // }
  //
  // componentDidMount () {
  //   this.parseIngredientParams();
  // }
  //
  // componentDidUpdate () {
  //
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/billing');
    // this.setState({loading: true});
    //
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Zilong',
    //     address: {
    //       street: 'Baker St.',
    //       city: 'Monstrocity',
    //       zipCode: '00125',
    //       country: 'Lojbania'
    //     },
    //     email: '1@0.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order)
    //   .then(r => {
    //     console.log(r);
    //     this.setState({loading: false, purchasing: false});
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     this.setState({loading: false, purchasing: false});
    //   });
  }

  render () {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
