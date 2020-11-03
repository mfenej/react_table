import React, { useEffect, useState } from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const Check = props => {

    let boolChecked;
    const makeArrayToDisplay = () => {
        boolChecked = [];
        props.allColumns.map((el) => {
            boolChecked.push({id:el.id, Header: el.Header, accessor: el.accessor, checked: true })
        })
    }

    makeArrayToDisplay();


    let arrToReturn;
    if (props.hiddenCol.length === 0) {
        arrToReturn = [];
        props.allColumns.map((el) => {
            arrToReturn.push({ id: el.id, Header: el.Header, accessor: el.accessor, val: false })
        })
        arrToReturn.push(true);
    } else {
        arrToReturn = props.hiddenCol
        boolChecked.map((el, i) => {
            el.checked = !arrToReturn[i].val;
        })
    }
    const editColumns = (id, stat) => {
        props.allColumns.map((el, i) => {
            if (el.id === id) {
                if (stat) {
                    arrToReturn[i].val = false;
                    arrToReturn[arrToReturn.length - 1] = !arrToReturn[arrToReturn.length - 1];
                } else {
                    arrToReturn[i].val = true;
                    arrToReturn[arrToReturn.length - 1] = !arrToReturn[arrToReturn.length - 1];
                }
            }
        });
      props.onChangeColumns(arrToReturn)
    }
    return <div style={{ width: '100%', height: '100%', backgroundColor: '#354f69'}}>
        {boolChecked.map((el, i) => {
            return <CheckBox
                    text={el.id}
                    checked={el.checked}
                    handler={editColumns}
                    key={i}
                />
     
        })}
    </div>

};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeColumns: (columns) =>
            dispatch(actions.extractColumns(columns)),
    };
};
export default connect(null, mapDispatchToProps)(Check)