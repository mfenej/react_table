import * as actionTypes from '../actions/actionTypes';
import reducer from './client';

describe('Client Reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
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
		});
	});

	it('should return all clients upon dispatching fetchClients', () => {
		expect(
			reducer(
				{
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
				},
				{
					type: actionTypes.FETCH_CLIENTS,
					clients: [
						{
							code: 'abc',
							label: 'xyc',
							validFrom: '20/2',
							validTo: '25/3',
							airportCode: 'AP',
							remarks: 'some remarks',
						},
					],
				}
			)
		).toEqual({
			clients: [
				{
					code: 'abc',
					label: 'xyc',
					validFrom: '20/2',
					validTo: '25/3',
					airportCode: 'AP',
					remarks: 'some remarks',
				},
			],
		});
	});

	it('should add a new client to the array upon dispatching addClient', () => {
		expect(
			reducer(
				{
					clients: [],
				},
				{
					type: actionTypes.ADD_CLIENT,
					clientData: {
						code: 'random client',
						label: 'random client',
						validFrom: '20/2',
						validTo: '25/3',
						airportCode: 'random client',
						remarks: 'some remarks',
					},
					clientId: 'mma123123',
				}
			)
		).toEqual({
			clients: [
				{
					id: 'mma123123',
					code: 'random client',
					label: 'random client',
					validFrom: '20/2',
					validTo: '25/3',
					airportCode: 'random client',
					remarks: 'some remarks',
				},
			],
		});
	});

	it('it should update a certain client in the clients array upon dispatching updateClient', () => {
		expect(
			reducer(
				{
					clients: [
						{
							id: '1234',
							code: 'old client',
							label: 'old client',
							validFrom: '20/2',
							validTo: '25/3',
							airportCode: 'old client',
							remarks: 'old remarks',
						},
					],
				},
				{
					type: actionTypes.UPDATE_CLIENT,
					clientId: '1234',
					updatedClient: {
						id: '1234',
						code: 'new client',
						label: 'new client',
						validFrom: '20/2',
						validTo: '25/3',
						airportCode: 'new client',
						remarks: 'new remarks',
					},
				}
			)
		).toEqual({
			clients: [
				{
					id: '1234',
					code: 'new client',
					label: 'new client',
					validFrom: '20/2',
					validTo: '25/3',
					airportCode: 'new client',
					remarks: 'new remarks',
				},
			],
		});
	});

	it('it should delete a client in the clients array upon dispatching deleteClient', () => {
		expect(
			reducer(
				{
					clients: [
						{
							id: '5555',
							code: 'client',
							label: 'client',
							validFrom: '20/2',
							validTo: '25/3',
							airportCode: 'client',
							remarks: 'remarks',
						},
					],
				},
				{
					type: actionTypes.DELETE_CLIENT,
					clientId: '5555',
				}
			)
		).toEqual({
			clients: [],
		});
	});
});
