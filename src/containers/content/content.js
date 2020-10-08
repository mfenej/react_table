import React from 'react';
import { connect } from 'react-redux';

import Detailsfrom from '../Details/Details';
import Table from '../Table/Table';

import * as actions from '../../store/actions/index';
const content = (props) => {

	let displayDetailsfrom = null;
	if (props.isDisplayed) {
		displayDetailsfrom = <Detailsfrom />
	}

	return (<div style={{ display: 'flex', marginTop: '2rem', height: '80vh' }}>
		<Table />
		{displayDetailsfrom}
	</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isDisplayed: state.dForm.isDisplayed,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// expected to get a boolean value
		onFormDisplay: (isDisplayed) => dispatch(actions.displayForm(isDisplayed))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(content);
