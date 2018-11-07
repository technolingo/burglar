import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.3,
  meat: 1.3
}

const BASE_PRICE = 4;

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: BASE_PRICE,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };


  updatePurchaseState = (updatedIngredients) => {
    const totalIngredients = {...updatedIngredients};
    const totalIngredientPrice = Object.keys(totalIngredients).map(
      igKey => (totalIngredients[igKey] * INGREDIENT_PRICES[igKey])
    ).reduce((i, j) => (i+=j), 0)
    this.setState({purchasable: totalIngredientPrice > 0});
  }

  addIngredientHandler = (type) => {
    const prevCount = this.state.ingredients[type];
    const updatedCount = prevCount+1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;

    // update total price
    let totalPrice = this.state.totalPrice;
    totalPrice += INGREDIENT_PRICES[type];

    this.setState({ingredients: updatedIngredients, totalPrice: totalPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const prevCount = this.state.ingredients[type];
    // prevent removing non-existent ingredients
    if (prevCount <= 0) {
      return;
    }

    const updatedCount = prevCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;

    // update total price
    let totalPrice = this.state.totalPrice;
    totalPrice -= INGREDIENT_PRICES[type];

    this.setState({ingredients: updatedIngredients, totalPrice: totalPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  // show order summary
  orderHandler = () => {
    this.setState({purchasing: true});
  }

  // dismiss order summary
  abandonCartHandler = () => {
    this.setState({purchasing: false});
  }

  // handle checkout
  checkOutHandler = () => {
    const queryParams = [];
    for (let k in this.state.ingredients) {
      queryParams.push(encodeURIComponent(k) + '=' + encodeURIComponent(this.state.ingredients[k]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = '?' + queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: queryString
    });
  }

  componentDidMount = () => {
    axios.get('https://hungryburglar.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ingredients: res.data});
      })
      .catch(e => {
        console.log(e);
        this.setState({error: true});
      });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burger = this.state.error ? <p>Ingredients Cannot Be Loaded.</p> : <Spinner />;
    // only render ingredients-dependent components after
    // ingredients data have been downloaded from the database
    if (this.state.ingredients) {
      burger = (
        <>
        <Burger ingredients={this.state.ingredients} />
        <Controls
          ingredAdded={this.addIngredientHandler}
          ingredRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          totalPrice={this.state.totalPrice}
          ordered={this.orderHandler}
          purchasable={this.state.purchasable}
        />
        </>
      );

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        ingredientPrices={INGREDIENT_PRICES}
        basePrice={BASE_PRICE}
        totalPrice={this.state.totalPrice}
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


export default withErrorHandler(BurgerBuilder, axios);
