import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                error: null,
                show: false
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                // console.log(req);
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => {
                this.setState({ show: false });
                // console.log(res);
                return res;
            }, error => {
                this.setState({ error: error, show: true });
                // console.log(error.message)
            });
        }

        // state = {
        //     error: null,
        //     show: false
        // }

        // componentDidMount() {
        //     // this.reqInterceptor = 
        //     axios.interceptors.request.use(req => {
        //         this.setState({ error: null });
        //         return req;
        //     });
        //     // this.resInterceptor = 
        //     axios.interceptors.response.use(res => {
        //         this.setState({ show: false });
        //     }, error => {
        //         this.setState({ error: error, show: true });
        //         console.log(error.message)
        //     });
        // }

        componentWillUnmount() {
            // console.log('Will unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }


        errorConfirmedHandler = () => {
            this.setState({ error: null, show: false })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.show}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
