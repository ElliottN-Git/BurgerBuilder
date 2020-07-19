import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Auth extends Component {
    state = {
        signUpForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    }

    componentDidMount() {
        // console.log('AUTH cDM: isAuth: ' + this.props.isAuth + ', building: ' + this.props.buildingBurger);
        if (this.props.isAuth === false) {
            this.props.onSetAuthRedirectPath('/auth');
        } else if (this.props.isAuth && this.props.buildingBurger === false) {
            this.props.onSetAuthRedirectPath('/');
        } else if (this.props.buildingBurger === true && this.props.isAuth === true) {
            this.props.onSetAuthRedirectPath('/checkout');
        }
    }

    componentDidUpdate() {
        // console.log('AUTH cDU: isAuth: ' + this.props.isAuth);
        if (this.props.isAuth && this.props.buildingBurger === false) {
            this.props.onSetAuthRedirectPath('/');
        } else if (this.props.buildingBurger === true && this.props.isAuth === true) {
            this.props.onSetAuthRedirectPath('/checkout');
        } 
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedInputs = {
            ...this.state.signUpForm,
            [inputId]: {
                ...this.state.signUpForm[inputId],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.signUpForm[inputId].validation),
                touched: true
            }
        };
        this.setState({ signUpForm: updatedInputs });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.signUpForm.email.value, this.state.signUpForm.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.signUpForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))

        if (this.props.loading) {
            form = <Spinner />
        };

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        };


        let authRedirect = <Redirect to={this.props.authRedirect} />;

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignUp ? 'SIGNUP' : 'SIGNIN'}</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
