import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import { NavLink } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleSideDrawer from '../SideDrawer/ToggleSideDrawer/ToggleSideDrawer';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>   
            <Logo />
            <NavLink className={classes.NavLink} to="/en">EN</NavLink>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
        <ToggleSideDrawer clicked={props.openSD}/>
    </header>
);


export default Toolbar;