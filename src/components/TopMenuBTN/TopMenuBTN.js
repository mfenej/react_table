import React from 'react';
import icon from '../../assets/svg/all.svg';
import classes from './TopMenu.module.css';
const TopMenuBTN = props => {
    let toReturn = null;
    if (props.type === 'add') {
        toReturn = (
            < button onClick={props.addClient} id="add" className={[classes.topMenuBtn, classes.topMenuBtnAdd].join(' ')} >
                <svg className={classes.topMenuBtnAddIcon}>
                    <use xlinkHref={`${icon}#icon-plus`} />
                </svg>
        ADD
            </button >
        );
    } else {
        toReturn = (
            <button className={[classes.topMenuBtn, classes.topMenuBtnTeminal].join(' ')}>
                <svg className={classes.topMenuBtnTeminalIcon}>
                    <use xlinkHref={`${icon}#icon-settings`} />
                </svg>
          Terminals
            </button>
        );
    }
    return (
        <React.Fragment>
            {toReturn}
        </React.Fragment>
    );
}
export default TopMenuBTN;