import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputEle = null;
    const inputClasses = [classes.InputEle];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputEle = <input 
                key={props.key}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />;   
            break;
        case ('textarea'):
            inputEle = <textarea
                key={props.key}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />;
            break;
        case ('select'):
            inputEle = (
                <select
                    key={props.key}
                    className={classes.InputEle}
                    value={props.value}
                    onChange={props.changed}
                    >
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                </select>
            )
            break;
        default:
            inputEle = <input 
                className={classes.InputEle}
                {...props.elementConfig}
                value={props.value}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEle}
        </div>
    )
}

export default input;
