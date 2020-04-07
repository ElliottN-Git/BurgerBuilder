import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/BBlogo.png';

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="BurgerBuilder" />
        </div>
    );
}

export default Logo

