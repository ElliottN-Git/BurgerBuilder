import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Order from '../../../components/Order/Order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                // if(res.data) {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ orders: fetchedOrders, loading: false });
                // } else {
                //     throw Error("no orders")
                // }
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }


    render() {
        if (this.state.loading) {
            return <Spinner />
        } else {
            if (this.state.orders.length >= 1) {
                return (
                    <div>
                        {this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);
