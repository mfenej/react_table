import React from 'react';
import icon from '../../assets/svg/all.svg';

const detailsMenuBTN = props => {
    let toReturn = null;
    if (props.id) {
        toReturn = (<button onClick={props.click} id={props.id} className={props.btnClasses.join(' ')}>
            <svg className={props.svgClasses}>
                <use xlinkHref={`${icon}#${props.icon}`} />
            </svg>
            {props.text}
        </button>)
    } else {
        toReturn = (<button onClick={props.click} className={props.btnClasses.join(' ')}>
            <svg className={props.svgClasses}>
                <use xlinkHref={`${icon}#${props.icon}`} />
            </svg>
            {props.text}
        </button>)
    }

    return (
        <React.Fragment>
            {toReturn}
        </React.Fragment>
    );
}
export default detailsMenuBTN;