import React from 'react';
import { connect } from 'react-redux';
import classes from './TopMenu.module.css';

import TopMenuBTN from '../../components/TopMenuBTN/TopMenuBTN';

import * as actions from '../../store/actions/index';

import icon from '../../assets/svg/all.svg';

const topMenu = (props) => {
	const search = () => {
		const input = document.getElementById('big-input');
		const table = document.querySelector('table');
		const tr = table.getElementsByTagName('tr');
		const th = table.getElementsByTagName('th');
		const filter = input.value.toUpperCase();
		let td;
		let txtValue;

		for (let i = 0; i < tr.length; i++) {
			for (let j = 0; j < th.length; j++) {
				td = tr[i].getElementsByTagName('td')[j];

				if (td) {
					txtValue = td.textContent || td.innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = 'flex';
						break;
					} else {
						tr[i].style.display = 'none';
					}
				}
			}
		}
	};
	const addClient = () => {
		props.onExtractClient(null);
		props.onFormDisplay(true);
	};
	return (
		<div className={classes.topMenu}>
			<TopMenuBTN />
			<TopMenuBTN type="add" addClient={addClient} />

			<div className={classes.topMenuItem}>
				<select name="type" id="type" className={classes.topMenuItemSelect}>
					<option value="swl">Terminals</option>
				</select>
			</div>
			<div className={classes.topMenuSearch}>
				<svg className={classes.search_icon}>
					<use xlinkHref={`${icon}#icon-magnifying-glass`} />
				</svg>
				<input
					className={classes.topMenuInput}
					type="text"
					placeholder="Search"
					id="big-input"
					onKeyUp={() => {
						search();
					}}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isDisplayed: state.dForm.isDisplayed,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// expecting to get client data as an object
		onExtractClient: (clientData) =>
			dispatch(actions.extractClient(clientData)),

		// expected to get a boolean value
		onFormDisplay: (isDisplayed) => dispatch(actions.displayForm(isDisplayed)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(topMenu);
