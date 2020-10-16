import React, { useEffect, useState } from 'react';
import classes from './SearchValue.module.css';
import CheckBox from '../CheckBox/CheckBox'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';




let arrBool = [];
const SearchValue = props => {
    let [allChecked, setALLChecked] = useState(true);
    useEffect(() => {
        arrBool = [];
        props.data.map(() => {
            arrBool.push(true);
        })
    }, [props.data])
    //init arrays
    if (arrBool.length === 0) {
        props.data.map(() => {
            arrBool.push(true);
        })
    }



    const checkBoolAllFalse = () => {
        let bool = true;
        arrBool.map(el => {
            if (el === true)
                bool = false;
        })
        return bool
    }

    useEffect(() => {
        if (!checkBoolAllFalse() && !allChecked) {
            let searchWords = '';
            arrBool.map((el, i) => {
                if (el) {
                    searchWords += props.data[i] + " ";
                }
            })
            props.onSendSearchData(searchWords.trim(), props.id)
        } else {
            props.onSendSearchData('', props.id)
        }
    }, [allChecked, props.id])

    const selectAll = () => {
        setALLChecked(!allChecked);

        if (!allChecked) {
            arrBool.map((el, i) => {
                arrBool[i] = true;
            })
        } else {
            arrBool.map((el, i) => {
                arrBool[i] = false;
            })
        }
    }
    const singleSelect = (id, check) => {
        let i = props.data.indexOf(id);
        arrBool[i] = check;

        //the props in check box only change for the furst uncheck so this will make it for all
        setTimeout(() => { setALLChecked(''); }, 1);

        if (arrBool.includes(false)) {
            setALLChecked(false);
        } else {
            setTimeout(() => {
                setALLChecked(true);
            }, 2);
        }
    }


    return <div style={{ width: '100%', height: '100%', backgroundColor: '#354f69' }}>
        
        <div className={classes.checkBoxCont} style={{ height: '11.2rem', overflowY: 'scroll' }}>

            <CheckBox text={'SelectAll'}
                checked={allChecked}
                handler={selectAll}
                key={0}
            />

            {props.data.map((el, i) => {

                return <CheckBox
                    text={el}
                    checked={arrBool[i]}
                    handler={singleSelect}
                    key={i + 1}
                />

            })
            }
        </div>
    </div>
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSendSearchData: (data, id) =>
            dispatch(actions.extractVal(data, id)),
    };
};
export default connect(null, mapDispatchToProps)(SearchValue);