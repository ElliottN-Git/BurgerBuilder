import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        // console.log("[OrderSummary] updated");
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>: {this.props.ingredients[igKey]}
                </li> );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button 
                    btnType="Success" 
                    clicked={this.props.purchaseContinued}>
                    CONTINUE
                </Button>
                <Button 
                    btnType="Danger" 
                    clicked={this.props.purchaseCancelled}>
                    CANCEL
                </Button>
            </Aux>
        )
    };
}

export default OrderSummary;