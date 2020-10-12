import axios from 'axios';
import uniqid from 'uniqid';

import * as actionTypes from '../actions/actionTypes';

// fetching clients from firebase
const fetchClientsSuccess = (clients) => {
	return {
		type: actionTypes.FETCH_CLIENTS,
		clients,
	};
};

const createTimestamp = () => {
	const currentDate = new Date().toLocaleString();

	return currentDate;
};

const createClients = (num) => {
	const length = num;
	const clients = [
		{
			code: 'jesse',
			label: 'User',
			validFrom: '1-1-2010',
			validTo: '1-2-2010',
			airportCode: 'Aireport 1',
			remarks: 'something',
		},
		{
			code: 'walter',
			label: 'Admin',
			validFrom: '1-11-2010',
			validTo: '1-12-2010',
			airportCode: 'Aireport 2',
			remarks: 'thing',
		},
	];


	for (let i = 0; i < length; i++) {
		const code = uniqid();

		const timestamp = createTimestamp();
		const client = {
			code,
			label: 'User'+i,
			validFrom: timestamp,
			validTo: timestamp,
			airportCode: 'UAE#2323',
			remarks: 'something',
		};

		clients.push(client);
	}
	
	
	return clients;
};

export const fetchClients = (num = 30) => {
	return async (dispatch) => {
		// testing
		const clients = createClients(num);
		dispatch(fetchClientsSuccess(clients));

		// try {
		// 	const res = await axios.get(
		// 		'https://react-table-53938.firebaseio.com/clients.json'
		// 	);

	// 		const fetchedClients = [];

	// 		for (let key in res.data) {
	// 			fetchedClients.push({
	// 				id: key,
	// 				...res.data[key],
	// 			});
	// 		}
	// 		dispatch(fetchClientsSuccess(fetchedClients));
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	};
};

// adding a client to firebase
const addClientSuccess = (client, clientId) => {
	return {
		type: actionTypes.ADD_CLIENT,
		clientData: client,
		clientId,
	};
};

export const addClient = (client) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				'https://react-table-53938.firebaseio.com/clients.json',
				client
			);
			const id = res.data.name;

			dispatch(addClientSuccess(client, id));
		} catch (error) {
			console.log(error);
		}
	};
};

// updating a client on firebase
const updateClientSuccess = (clientId, updatedClient) => {
	return {
		type: actionTypes.UPDATE_CLIENT,
		clientId,
		updatedClient,
	};
};

export const updateClient = (clientId, updatedClient) => {
	return async (dispatch) => {
		try {
			await axios.put(
				`https://react-table-53938.firebaseio.com/clients/${clientId}.json`,
				updatedClient
			);

			dispatch(updateClientSuccess(clientId, updatedClient));
			dispatch(fetchClients());
		} catch (error) {
			console.log(error);
		}
	};
};

// deleting a client from firebase
const deleteClientSuccess = (clientId) => {
	return {
		type: actionTypes.DELETE_CLIENT,
		clientId,
	};
};

export const deleteClient = (clientId) => {
	return async (dispatch) => {
		try {
			await axios.delete(
				`https://react-table-53938.firebaseio.com/clients/${clientId}.json`
			);
			dispatch(deleteClientSuccess(clientId));
		} catch (error) {
			console.log(error);
		}
	};
};
