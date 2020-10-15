import React, { useEffect, useState } from 'react';
import classes from './SearchInput.module.css';
import icon from '../../../assets/svg/all.svg';


const SearchInput = props => {

    const [searchValue, setSearchValue] = useState('');
    const [selectValue, setSelectValue] = useState('contains');

    useEffect(() => {

        props.searchColumn(props.ID, searchValue, selectValue)

    }, [searchValue, selectValue]);
    
    return <div style={{ width: '100%', height: '100%', backgroundColor: '#354f69' }}>
        <button className={classes.BTN__Search}>NORMAL</button>

        <button onClick={() => props.contentDropSearchValue()} className={classes.BTN__SearchDark}>Value</button>

        <select onChange={e => setSelectValue(e.target.value)} className={classes.search__select}>
            <option value='contains'>Contains</option>
            <option value='notContains'>Not Contains</option>
            <option value='startWith'>Start With</option>
            <option value='endsWith'>Ends With</option>
            <option value='notEqual'>Not Equal</option>
            <option value='equal'>Equal</option>
        </select>

        <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className={classes.table__input}
        />

        <button className={classes.BTN__clear} onClick={() => setSearchValue('')}>
            <svg className={classes.table__menu__item__btnIcon}>
                <use xlinkHref={`${icon}#icon-x-circle`} />
            </svg>
            CLEAR
        </button>

    </div>
};
export default SearchInput;
