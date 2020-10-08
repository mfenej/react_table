import React from 'react';
import classes from './deleteItem.module.css';
import icon from '../../assets/svg/all.svg';

const DeleteItem = props => {
    return (
        <div className={classes.deleteItemContainer} >
            <div className={classes.deleteItemContainer__alert}>
                <div className={classes.deleteItemContainer__alert__message}>
                    <h4 className={[classes.deleteItemContainer__alert__message__text, classes.deleteItemContainer__alert__message__textNormal].join(' ')}>
                        are you sure you want to </h4>
                    <h4 className={[classes.deleteItemContainer__alert__message__text, classes.deleteItemContainer__alert__message__textRed].join(' ')}>
                        delete </h4>
                    <h4 className={[classes.deleteItemContainer__alert__message__text, classes.deleteItemContainer__alert__message__textNormal].join(' ')}>
                        the terminal data?</h4>
                </div>

                <div className={classes.deleteItemContainer__alert__buttons}>
                    <button className={[classes.deleteItemContainer__alert__buttons__button, classes.deleteItemContainer__alert__buttons__buttonYes].join(' ')}>
                        <svg className={classes.deleteItemContainer__alert__buttons__buttonYesIcon}>
                            <use xlinkHref={`${icon}#icon-check_circle_outline`} />
                        </svg>
                         yes
                    </button>

                    <button className={[classes.deleteItemContainer__alert__buttons__button, classes.deleteItemContainer__alert__buttons__buttonNo].join(' ')}>
                        <svg className={classes.deleteItemContainer__alert__buttons__buttonNoIcon}>
                            <use xlinkHref={`${icon}#icon-x-circle`} />
                        </svg>
                         no
                    </button>
                </div>
            </div>
        </div >
    );
}
export default DeleteItem;