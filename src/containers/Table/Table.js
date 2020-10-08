import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ReactTable from '../../components/ReactTable/ReactTable';

import * as actions from '../../store/actions/index';

const Table = (props) => {
	const { onCLientInit } = props;

	useEffect(() => {
		onCLientInit();
	}, [onCLientInit]);
	return <ReactTable clients={props.clients} />;
};

const mapStateToProps = (state) => {
	return {
		clients: state.client.clients,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCLientInit: () => dispatch(actions.fetchClients()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
