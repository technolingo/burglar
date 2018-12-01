import * as actionTypes from '../actions/actionTypes';
import { BASE_PRICE, INGREDIENT_PRICES } from '../../containers/BurgerBuilder/BurgerBuilder';
import { updateObject } from './utilities';

const initialState = {
  ingredients: null,
  fetchIngredientsFailed: false,
  totalPrice: BASE_PRICE
}

const setIngredients = (state, action) => ({
  ...state,
  ingredients: {
    // ...action.ingredients
    // hard code ingredients to preserve the order thereof
    // since the database store these alphabetically
    salad: action.ingredients.salad || 0,
    bacon: action.ingredients.bacon || 0,
    cheese: action.ingredients.cheese || 0,
    meat: action.ingredients.meat || 0
  },
  totalPrice: BASE_PRICE,
  fetchIngredientsFailed: false
});

const addIngredient = (state, action) => ({
  ...state,
  ingredients: {
    ...state.ingredients,
    // use [] to dynamically alter an object's attribute (ES6)
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  },
  // update the total price accordingly
  totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
});

const removeIngredient = (state, action) => {
  if (state.ingredients[action.ingredientName] > 0) {
    return ({
      ...state,
      ingredients: {
        ...state.ingredients,
        // use [] to dynamically alter an object's attribute (ES6)
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      },
      // update the total price accordingly
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    });
  } else {
    return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {fetchIngredientsFailed: true});
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    default: return state;
  }
};

export default reducer;
