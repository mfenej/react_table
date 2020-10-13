import React, { useEffect, useState } from 'react';
import classes from './SearchInput.module.css';
import icon from '../../../assets/svg/all.svg';


const SearchInput = props => {

    const [searchValue, setSearchValue] = useState('');
    const [selectValue, setSelectValue] = useState('contains');



    const search = (searchValue, selectValue) => {
        props.searchColumn(props.ID,searchValue, selectValue)
        const filter = searchValue.toUpperCase();
        const table = document.querySelector('table');
        const tr = table.getElementsByTagName('tr');

        let txtValue;
        let td;
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName('td')[props.ID];
            if (td) {
                txtValue = td.textContent || td.innerText;
                txtValue = txtValue.toUpperCase();
                    
                switch (selectValue) {
                    case 'contains':
                        if (txtValue.indexOf(filter) > -1) {
                            tr[i].style.display = 'flex';
                        } else {
                            tr[i].style.display = 'none';
                        }
                        break;
                    case 'notContains':
                        if (txtValue.indexOf(filter) === -1) {
                            tr[i].style.display = 'flex';
                        } else {
                            tr[i].style.display = 'none';
                        }
                        break;
                    case 'startWith':
                        if (txtValue.startsWith(filter)) {
                            tr[i].style.display = 'flex';
                        } else {
                            tr[i].style.display = 'none';
                        }
                        break;
                    case 'endsWith':
                        if (txtValue.endsWith(filter)) {
                            tr[i].style.display = 'flex';
                        } else {
                            tr[i].style.display = 'none';
                        }
                        break;
                    case 'notEqual':
                        if (txtValue!==filter) {
                            tr[i].style.display = 'flex';
                        } else {
                            tr[i].style.display = 'none';
                        }
                        break;
                    case 'equal':
                        if (txtValue === filter) {
                            tr[i].style.display = 'flex';
                        } else {
                            tr[i].style.display = 'none';
                        }
                        break;
                    default:
                        alert('You were trying to search How on earth did i get here')
                }
            }
        }
    }
    useEffect(() => {

        search(searchValue, selectValue);

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
