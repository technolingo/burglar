import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
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
    loading: false
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
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Zilong',
        address: {
          street: 'Baker St.',
          city: 'Monstrocity',
          zipCode: '00125',
          country: 'Lojbania'
        },
        email: '1@0.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(r => {
        console.log(r);
        this.setState({loading: false, purchasing: false});
      })
      .catch(e => {
        console.log(e);
        this.setState({loading: false, purchasing: false});
      });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <OrderSummary
                            ingredients={this.state.ingredients}
                            ingredientPrices={INGREDIENT_PRICES}
                            basePrice={BASE_PRICE}
                            totalPrice={this.state.totalPrice}
                            close={this.abandonCartHandler}
                            checkout={this.checkOutHandler}
                          />;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal display={this.state.purchasing} close={this.abandonCartHandler}>
        {orderSummary}
        </Modal>
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
  }
}


export default BurgerBuilder;
