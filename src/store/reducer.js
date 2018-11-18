import * as actionTypes from './actions';
import { BASE_PRICE, INGREDIENT_PRICES } from '../containers/BurgerBuilder/BurgerBuilder';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: BASE_PRICE
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // use [] to dynamically alter an object's attribute (ES6)
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        // update the total price accordingly
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredientName] > 0) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            // use [] to dynamically alter an object's attribute (ES6)
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
          },
          // update the total price accordingly
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default reducer;
