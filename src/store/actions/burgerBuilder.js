import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngredient = ingName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingName
});

export const removeIngredient = ingName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingName
});

const setIngredients = ings => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ings
});

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initializeIngredientsAsync = () => {
  return dispatch => {
    axios.get('https://hungryburglar.firebaseio.com/ingredients.json')
      .then(r => {
        dispatch(setIngredients(r.data));
      })
      .catch(e => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
