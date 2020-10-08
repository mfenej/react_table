import React, { useEffect, useState } from 'react';
import classes from './CheckBox.module.css'
 
const CheckBox = React.memo(props => {
    let [check,setCheck] = useState(props.checked);

    const change = () => {
        setCheck(!check);
        props.handler(props.text, !check)
    }
    useEffect(() => {
        setCheck(props.checked) 
    }, [props.checked])

    return <div className={classes.container}>
        <input
            className={classes.checkBox}
            id={props.text}
            type="checkbox"
            checked={check}
            onChange={change}
        />
        <label onClick={change} style={{ marginLeft: '1rem', cursor: 'pointer' }}>{props.text}</label>
    </div>
});

export default CheckBox;