import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Order from '../../../components/Order/Order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

export class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }


    render() {
        if (this.props.loading) {
            return <Spinner />
        } else {
            if (this.props.orders.length >= 1) {
                return (
                    <div>
                        {this.props.orders.map(order => (
                            <Order
                                key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}
                            />
                        ))}
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1>No orders have been placed</h1>
                        <a href="/">Click here to build a burger</a>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
