import React from 'react';
import icon from '../../assets/svg/all.svg';
const DropDownItem = props => (
    <button style={{
        height: "20%",
        width:'max-content',
        backgroundColor: "#354f69",
        color: '#e9edf0',
        display: 'flex',
        fontSize: '1.1rem',
        lineHeight:'1rem',
        border: 'none',
        alignItems: 'center'
        
    }} onClick={props.act}>
        <svg style={{
            height: '1.5rem',
            width: '1.5rem',
            fill: '#e9edf0',
            marginRight: '0.2rem'
        }}>
            <use xlinkHref={`${icon}#${props.icon}`} />
        </svg>
        < label>
            {props.text}
        </label>


    </button>
);
export default DropDownItem;