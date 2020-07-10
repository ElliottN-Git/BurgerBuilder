import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/index';
import ContactData from './ContactData/ContactData';

export class Checkout extends Component {

    componentWillMount() {
        // this.props.onInitPurchase();
        //     const query = new URLSearchParams(this.props.location.search);
        //     const ingredients = {};
        //     let price = 0;
        //     for (let param of query.entries()) {
        //         if (param[0] === 'price') {
        //             price = param[1];
        //         } else {
        //             ingredients[param[0]] = +param[1];
        //         }
        //     }
        //     this.setState({ ingredients: ingredients, price: price });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        
        if (this.props.ingds) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingds}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    // render={(props) => (<ContactData ingredients={this.props.ingds}
                    //     price={this.props.} {...props} />)}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingds: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     };
// }

export default connect(mapStateToProps)(Checkout);
