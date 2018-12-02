import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

export const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.3,
  meat: 1.3
}

export const BASE_PRICE = 4;

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  // show order summary
  orderHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.history.push('/auth?next=/checkout');
    }
  }

  // dismiss order summary
  abandonCartHandler = () => {
    this.setState({purchasing: false});
  }

  // handle checkout
  checkOutHandler = () => {
    // re-set purchased to false to prevent redirect
    this.props.onPurchaseInit();

    this.props.history.push('/checkout');
  }

  componentDidMount = () => {
    this.props.onInitializeIngredients();
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients Cannot Be Loaded.</p> : <Spinner />;
    // only render ingredients-dependent components after
    // ingredients data have been downloaded from the database
    if (this.props.ings) {
      burger = (
        <>
        <Burger ingredients={this.props.ings} />
        <Controls
          isAuth={this.props.isAuthenticated}
          ingredAdded={this.props.onIngredientAdded}
          ingredRemoved={this.props.onIngredientRemoved}
          disabledInfo={disabledInfo}
          totalPrice={this.props.total}
          ordered={this.orderHandler}
          purchasable={this.props.total > BASE_PRICE}
        />
        </>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        ingredientPrices={INGREDIENT_PRICES}
        basePrice={BASE_PRICE}
        totalPrice={this.props.total}
        close={this.abandonCartHandler}
        checkout={this.checkOutHandler}
      />;
    }

    return (
      <>
        <Modal display={this.state.purchasing} close={this.abandonCartHandler}>
        {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  total: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.fetchIngredientsFailed,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
  onInitializeIngredients: () => dispatch(actions.initializeIngredientsAsync()),
  onPurchaseInit: () => dispatch(actions.purchaseInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
