import React, { useState } from 'react';
import DropDownItem from '../../DropDownItem/DropDownItem';
import icon from '../../../assets/svg/all.svg';
const Main = props => {
    const gropby = () => {
        props.resetsizing();
        props.groupBy(props.localSearchIds[props.index])
    }
    const [isShown, setIsShow] = useState('none');
    let toolgroup = {
        padding: "0px",
        listStyle: "none",
        width: "100%",
        background: "#354f69",
    }
    let toolgroup_li_ul = {

        position: 'absolute',
        left: '65%',
        top: '0px',
        width: 'max-content',
        height: 'max-content',
        borderRadius: '3px',
        overflow: 'hidden',
    }
    let toolgroup_li = {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '2rem',
        fontSize: '1.1rem',
        lineHeight: '1rem',
        alignItems: 'center'
    }
    let toolgroup_li_ul_li = {
        listStyle: "none",
        width: '9rem',
        position: 'relative',
        backgroundColor: '#354f69',
        color: 'white',
        height: '2rem',
    }
    let toolgroup_li_a = {
        color: '#e9edf0'
    }
    let svgStyle = {
        height: '1.5rem',
        width: '1.5rem',
        fill: '#e9edf0',
        margin: '0 0.5rem'
    }

    const autoSizeColumn = (props) => {
        const ColFilter = props.otherProps && `${props.otherProps.columns.id.replace(/ /g,"_")}__input`;
        const colId = props.otherProps && props.otherProps.columns.id.replace(/ /g,"_");
        const cellId = props.otherProps && `${props.otherProps.columns.id.replace(/ /g,"_")}__cell`;
        let headerElement = document.querySelector(`[data-col-id="${colId}"]`);

        if(ColFilter && ColFilter !== null){
            let input = document.querySelector(`[data-col-id="${ColFilter}"]`);
            input.style.width = `${props.otherProps.width + 100}px`
        }

        if(cellId && cellId !== null){
            let cells = document.querySelectorAll(`.${cellId}`);
            cells.forEach((cell) => {
                cell.style.width = `${props.otherProps.width + 100}px`
            });
        }

        if(headerElement && headerElement !== null){
            headerElement.style.width = `${props.otherProps.width + 100}px`
        }

    }

    return <div style={{ height: '100%', backgroundColor: '#354f69' }}>
        <ul style={toolgroup}
            onMouseEnter={() => { setIsShow('block') }}
            onMouseLeave={() => { setIsShow('none') }}>
            <li style={toolgroup_li}

            >
                <svg style={svgStyle}>
                    <use xlinkHref={`${icon}#icon-pin-outline`} />
                </svg>

                <p style={toolgroup_li_a}>Pin Column</p>
                <svg style={svgStyle}>
                    <use xlinkHref={`${icon}#icon-forward`} />
                </svg>
                <ul style={{
                    display: isShown,
                    ...toolgroup_li_ul
                }}>
                    <li style={toolgroup_li_ul_li}>
                        <svg style={svgStyle}>
                            <use xlinkHref={`${icon}#${'someThing' === '' ? 'icon-check' : ''}`} />
                        </svg>
                        Pin Left
                    </li>
                    <li style={toolgroup_li_ul_li}>
                        <svg style={svgStyle}>
                            <use xlinkHref={`${icon}#${'someThing' === '' ? 'icon-check' : ''}`} />
                        </svg>
                        Pin Right
                    </li>
                    <li style={toolgroup_li_ul_li}>
                        <svg style={svgStyle}>
                            <use xlinkHref={`${icon}#${'someThing' === '' ? 'icon-check' : ''}`} />
                        </svg>
                        No Pin
                    </li>

                </ul>
            </li>
        </ul>
        <DropDownItem text='Autosize Column' act={() => autoSizeColumn(props)} />
        <DropDownItem text='Autosize All Columns' act={props.resetsizing} />
        <DropDownItem text='Group By Column' icon='icon-group_work' act={gropby} />
        <DropDownItem text='Reset Column' icon='icon-refresh'
            act={() => props.reset(props.localSearchIds[props.index])} />
    </div>
}
export default Main;