import React, {useEffect, useState } from 'react';
import classes from './SearchValue.module.css';
import CheckBox from '../CheckBox/CheckBox'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import InfiniteScroll from "react-infinite-scroll-component";




let arrBool = [];
let arrData = [];

const SearchValue = props => {
    let [haveMore, setHaveMore] = useState(true);
    let [itemCount, setitemCount] = useState(20);


    let [allChecked, setALLChecked] = useState(true);
    useEffect(() => {
        arrBool = [];
        props.data.forEach(() => {
            arrBool.push(true);
        })
    }, [props.data])
    //init arrays
    if (arrBool.length === 0) {
        props.data.forEach(() => {
            arrBool.push(true);
        })
    }



    const checkBoolAllFalse = () => {
        let bool = true;
        arrBool.forEach(el => {
            if (el === true)
                bool = false;
        })
        return bool
    }

    useEffect(() => {
        if (!checkBoolAllFalse() && !allChecked) {
            let searchWords = '';
            arrBool.forEach((el, i) => {
                if (el) {
                    searchWords += props.data[i] + " ";
                }
            })
            props.onSendSearchData(searchWords.trim(), props.id)
        } else {
            props.onSendSearchData('', props.id)
        }
    }, [allChecked, props.id,props])

    const selectAll = () => {
        setALLChecked(!allChecked);

        if (!allChecked) {
            arrBool.forEach((el, i) => {
                arrBool[i] = true;
            })
        } else {
            arrBool.forEach((el, i) => {
                arrBool[i] = false;
            })
        }
    };
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
    };
    arrData = props.data.slice(0, itemCount);
    const fetchMoreData = () => {
        if (props.data.length - itemCount >= 20)
            setitemCount(itemCount + 20);
        else {
            setHaveMore(false);
            setitemCount(itemCount + props.data.length - itemCount);
        }
    }
    return <div style={{ width: '100%', height: '80%', backgroundColor: '#354f69' }}>

        <div className={classes.checkBoxCont} style={{ height: '11.2rem' }}>

            <CheckBox text={'SelectAll'}
                checked={allChecked}
                handler={selectAll}
                key={0}
            />
            <InfiniteScroll
                dataLength={arrData.length}
                next={fetchMoreData}
                hasMore={haveMore}
                loader={<h4>Loading...</h4>}
                height={95}
                className={classes.checkBoxCont}
            >
                {arrData.map((el, i) => (

                    <CheckBox
                        text={el}
                        checked={arrBool[i]}
                        handler={singleSelect}
                        key={i + 1}
                    />

                ))
                }
            </InfiniteScroll>

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