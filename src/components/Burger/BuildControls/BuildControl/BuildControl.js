import React from 'react';
import classes from './BuildControl.module.css';
import BuildControls from '../BuildControls';

const BuildControl = (props) => (
    <div>
        <div>{props.igLabel}</div>
        <button>Add</button>
        <butto>Remove</butto>
    </div>
);


export default BuildControls;