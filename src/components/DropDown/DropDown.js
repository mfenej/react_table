import React from 'react';
import icon from '../../assets/svg/all.svg';
import classes from './DropDown.module.css';

import Main from './Main/Main';
import SearchInput from './SearchInput/SearchInput';
import SearchValue from './SearchValue/SearchValue';
import Check from './Check/Check';

const hideAllDropDown = () => {
	let d = document.getElementsByClassName('drop');
	for (let item of d) {
		item.style.display = 'none';
	}
};

let BTNMain = null;
let BTNSearch = null;
let BTNCheck = null;
let toRender = null;

let toReturn = null;
let BTNNormal = null;
let BTNValue = null;


const DropDown = (props) => {

	const displayDropDown = (id) => {
		hideAllDropDown();
		document.getElementById(`dropDown${id}`).style.display = 'block';
		contentDropMain(id);
	};

	const contentDropMain = (id) => {
		BTNMain = classes.table__menu__item__btn__open;
		BTNSearch = classes.table__menu__item__btn__closed;
		BTNCheck = classes.table__menu__item__btn__closed;
		toRender = <Main
			resetsizing={props.resetsizing}
			groupBy={props.groupBy}
			localSearchIds={props.localSearchIds}
			index={id}
			reset={props.reset}
		/>
	};
	const menuBTNS = () => (
		<div style={{ display: 'flex',overflow:'hidden',borderRadius:'5px' }}>
			<button
				onClick={() => {
					contentDropMain();
				}}
				id={`dropDownInBTN${props.ID}`}
				className={BTNMain}
			>
				<svg className={classes.table__menu__item__btnIcon}>
					<use xlinkHref={`${icon}#icon-menu`} />
				</svg>
			</button>

			<button
				onClick={() => {
					contentDropSearch('inp');
				}}
				id={`dropDownSearchBTN${props.ID}`}
				className={BTNSearch}
			>
				<svg className={classes.table__menu__item__btnIcon}>
					<use xlinkHref={`${icon}#icon-equalizer2`} />
				</svg>
			</button>

			<button
				onClick={() => {
					contentDropCheck(props.allColumns, props.hiddenCol);
				}}
				id={`dropDownColumnsBTN${props.ID}`}
				className={BTNCheck}
			>
				<svg className={classes.table__menu__item__btnIcon}>
					<use xlinkHref={`${icon}#icon-format_list_numbered`} />
				</svg>
			</button>
		</div>

	);
	const contentDropSearch = (type) => {
		BTNMain = classes.table__menu__item__btn__closed;
		BTNSearch = classes.table__menu__item__btn__open;
		BTNCheck = classes.table__menu__item__btn__closed;
		if (type === 'inp') {
			toReturn = contentDropSearchInput();
			BTNNormal = classes.BTN__Search;
			BTNValue = classes.BTN__SearchDark;
		} else {
			toReturn = contentDropSearchValue();
			BTNNormal = classes.BTN__SearchDark;
			BTNValue = classes.BTN__Search;
		}
		toRender =
			<React.Fragment>
				<button onClick={() => {
					toReturn = contentDropSearch('inp');
				}}
					className={BTNNormal}>NORMAL</button>

				<button onClick={() => {
					toReturn = contentDropSearch('val');
				}}
					className={BTNValue}>Value</button>
				{toReturn}
			</React.Fragment>
	}
	const contentDropSearchInput = () => {
		BTNMain = classes.table__menu__item__btn__closed;
		BTNSearch = classes.table__menu__item__btn__open;
		BTNCheck = classes.table__menu__item__btn__closed;
		return <SearchInput
			searchColumn={props.searchColumn}
			contentDropSearchValue={contentDropSearchValue}
			ID={props.ID}
		/>
	};
	const contentDropSearchValue = () => {
		BTNMain = classes.table__menu__item__btn__closed;
		BTNSearch = classes.table__menu__item__btn__open;
		BTNCheck = classes.table__menu__item__btn__closed;
		return <SearchValue
			id={props.ID}
			data={props.data}
			contentDropSearchInput={contentDropSearchInput}
		/>;
	};
	const contentDropCheck = (allColumns, hiddenCol) => {
		BTNMain = classes.table__menu__item__btn__closed;
		BTNSearch = classes.table__menu__item__btn__closed;
		BTNCheck = classes.table__menu__item__btn__open;
		toRender = <Check allColumns={allColumns} hiddenCol={hiddenCol} />
	};

	const toggleHideDropDown = React.useCallback((e) => {
		let element = document.getElementById(`dropDownContainer${props.ID}`);
		if (element !== null)
		if (element.contains(e.target)) {

			document.getElementById(`dropDown${props.ID}`).style.display = 'block';
		} else {

			document.getElementById(`dropDown${props.ID}`).style.display = 'none';
		}
		//e.stopPropagation()

	}, [props.ID])
	
	document.addEventListener('click', toggleHideDropDown);
	return (
		<div
			id={`dropDownContainer${props.ID}`}
		>
			<button
				onClick={() => {
					displayDropDown(props.ID);
				}}
				id={`dropDownBTN${props.ID}`}
				className={classes.table__menu__item__btn}
			>
				<svg className={classes.table__menu__item__btnIcon}>
					<use xlinkHref={`${icon}#icon-menu`} />
				</svg>
			</button>
			<div
				id={`dropDown${props.ID}`}
				className={'drop'}
				style={{
					position: 'absolute',
					width: '14rem',
					height: '16.5rem',
					top: '0.3rem',
					right: "-11.45rem",
					backgroundColor: '#3f5b76',
					zIndex: '2',
					borderRadius: '0.4rem',
					display: 'none',
					// overflow: 'hidden',
					fontFamily: 'unset',
				}}
			>
				{menuBTNS(props)}
				<div
					style={{
						textTransform: 'none',
						fontWeight: 'normal',
						fontSize: '1rem',
						textAlign: 'left',
						height: '83.4%',
					}}
				>
					{toRender}
				</div>
			</div>
		</div>
	);
};
export default DropDown;
