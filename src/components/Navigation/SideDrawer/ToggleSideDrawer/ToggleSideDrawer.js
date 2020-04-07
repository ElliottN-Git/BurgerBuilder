import React from 'react';
import classes from './ToggleSideDrawer.module.css';


const ToggleSideDrawer = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default ToggleSideDrawer;
