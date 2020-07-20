import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 2,
    bacon: 1.5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngedientAdd = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredientsAdd = updateObject(state.ingredients, updatedIngedientAdd);
            const updatedStateAdd = {
                ingredients: updatedIngredientsAdd,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedStateAdd);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngedient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngedient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                error: true
            });

        default:
            return state;
    }
};

export default reducer;