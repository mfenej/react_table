import * as actionTypes from '../actions/actionTypes';

const initialState = {
	clients: [
		{
			code: 'Loading...',
			label: 'Loading...',
			validFrom: 'Loading...',
			validTo: 'Loading...',
			airportCode: 'Loading...',
			remarks: 'Loading...',
		},
	],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CLIENTS:
			return {
				...state,
				clients: action.clients,
			};

		case actionTypes.ADD_CLIENT:
			const newClient = {
				...action.clientData,
				id: action.clientId,
			};
			return {
				...state,
				clients: state.clients.concat(newClient),
			};

		case actionTypes.UPDATE_CLIENT:
			const updatedClient = {
				...action.updatedClient,
				id: action.clientId,
			};

			// finding and replacing the client
			const clientIndex = state.clients.findIndex(
				(c) => c.id === updatedClient.id
			);
			state.clients[clientIndex] = updatedClient;

			return {
				...state,
			};

		case actionTypes.DELETE_CLIENT:
			const updatedClients = state.clients.filter(
				(client) => client.id !== action.clientId
			);
			return {
				...state,
				clients: updatedClients,
			};

		default:
			return state;
	}
};

export default reducer;
