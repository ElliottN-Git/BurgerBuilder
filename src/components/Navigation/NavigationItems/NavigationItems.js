import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" >Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {props.isAuth 
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Sign In</NavigationItem>
            }
        </ul>
    );
};


export default NavigationItems;
