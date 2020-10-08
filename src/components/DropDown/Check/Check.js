import React, { useEffect, useState } from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month.toString().length < 2) {
        month = '0' + month;
    }
    if (day.toString().length < 2) {
        day = '0' + day;
    }

    return [day, month, year].join('-');
};

let initarr = [
    {
        Header: 'code',
        accessor: 'colCode', // accessor is the "key" in the data
    },
    {
        Header: 'label',
        accessor: 'colLable', //use the to put data in this colomn like in the data const
    },
    {
        Header: 'valid form',
        accessor: 'colValidForm',
        Cell: (props) => {
            const d = props.value;
            const date = new Date(d);

            const formattedDate = formatDate(date);

            return formattedDate;
        },
    },
    {
        Header: 'valid to',
        accessor: 'colValidTo',
        Cell: (props) => {
            const d = props.value;
            const date = new Date(d);

            // calling the fuction to format the date as "DD-MM-YYYY"
            const formattedDate = formatDate(date);

            return formattedDate;
        },
    },
    {
        Header: 'airport iata',
        accessor: 'colAirport',
    },
    {
        Header: 'remarks',
        accessor: 'colRemarks',
    },
]

let arrToSend = [
    {
        Header: 'code',
        accessor: 'colCode', // accessor is the "key" in the data
        show: false
    },
    {
        Header: 'label',
        accessor: 'colLable', //use the to put data in this colomn like in the data const
    },
    {
        Header: 'valid form',
        accessor: 'colValidForm',
        Cell: (props) => {
            const d = props.value;
            const date = new Date(d);

            const formattedDate = formatDate(date);

            return formattedDate;
        },
    },
    {
        Header: 'valid to',
        accessor: 'colValidTo',
        Cell: (props) => {
            const d = props.value;
            const date = new Date(d);

            // calling the fuction to format the date as "DD-MM-YYYY"
            const formattedDate = formatDate(date);

            return formattedDate;
        },
    },
    {
        Header: 'airport iata',
        accessor: 'colAirport',
    },
    {
        Header: 'remarks',
        accessor: 'colRemarks',
    },
];

const Check = props => {

    let boolChecked;
    const makeArrayToDisplay = () => {
        boolChecked = [];
        initarr.map((el) => {
            boolChecked.push({ Header: el.Header, accessor: el.accessor, checked: true })
        })
    }

    makeArrayToDisplay();


    let arrToReturn;
    if (props.hiddenCol.length === 0) {
        arrToReturn = [];
        initarr.map((el) => {
            arrToReturn.push({ Header: el.Header, accessor: el.accessor, val: false })
        })
        arrToReturn.push(true);
    } else {
        arrToReturn = props.hiddenCol
        boolChecked.map((el, i) => {
            el.checked = !arrToReturn[i].val;
        })
    }
    const editColumns = (id, stat) => {
        initarr.map((el, i) => {
            if (el.Header === id) {
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
    return <div style={{ width: '100%', height: '85%', backgroundColor: '#354f69'}}>
        {boolChecked.map((el, i) => {
            return <CheckBox
                    text={el.Header}
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