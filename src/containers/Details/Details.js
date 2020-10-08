import React from 'react';
import { connect } from 'react-redux';

import ReduxForm from '../../components/ReduxForm/ReduxForm';

import * as actions from '../../store/actions/index';
const Details = (props) => {
	const submit = values => {
		// print the form values to the console
		let v = { ...values };
		v.validFrom = String(values.validFrom);
		v.validTo = (String(values.validTo))
		if (v.type === 'add') {
			props.onCLientAdded(v);
		} else if (v.type === 'delete') {
			props.onCLientDeleted(v.id);
		} else if (v.type === 'edit') { 	
			let id = v.id;
			delete v.id
			props.onCLientUpdated(id, v)
		} else if (v.type === 'copy') {
			delete v.id
			props.onCLientAdded(v)
		}
		props.onFormDisplay(false);

	}
	
	let fixedProps = { ...props.extractedClient, type: undefined };
	if (props.extractedClient !== null) {
		fixedProps.validFrom = new Date(fixedProps.validFrom);
		fixedProps.validTo = new Date(fixedProps.validTo);
	}

	return (
		<ReduxForm onSubmit={submit} initialValues={fixedProps} />
	);

};

const mapStateToProps = (state) => {
	return {
		extractedClient: state.dForm.formData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// expecting a client object as a parameter
		onCLientAdded: (clientData) => dispatch(actions.addClient(clientData)),
		// expecting the client ID as a parameter
		onCLientDeleted: (clientId) => dispatch(actions.deleteClient(clientId)),
		// expecting the ID of the client we want to updated, and a new client object to update
		onCLientUpdated: (clientId, updatedClient) =>
			dispatch(actions.updateClient(clientId, updatedClient)),
		onFormDisplay: (isDisplayed) => dispatch(actions.displayForm(isDisplayed))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
