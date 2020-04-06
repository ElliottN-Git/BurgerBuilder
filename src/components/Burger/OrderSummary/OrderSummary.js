import React from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                </span>: {props.ingredients[igKey]}
            </li> );
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button 
                btnType="Success" 
                clicked={props.purchaseContinued}>
                CONTINUE
            </Button>
            <Button 
                btnType="Danger" 
                clicked={props.purchaseCancelled}>
                CANCEL
            </Button>
        </Aux>
    )
};

export default OrderSummary;