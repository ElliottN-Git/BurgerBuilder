import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.igLabel}</div>
        <button 
            className={classes.More} 
            onClick={props.added}>
            +
        </button>
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>
            -
        </button>
    </div>
);


export default BuildControl;