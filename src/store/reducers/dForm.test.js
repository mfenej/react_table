import * as actionTypes from '../actions/actionTypes';
import reducer from './form';

describe('Form Reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			formData: null,
			isDisplayed: false,
		});
	});

	it('should store a client object upon dispatch', () => {
		expect(
			reducer(
				{ formData: null, isDisplayed: false },
				{ type: actionTypes.EXTRACT_CLIENT, client: { name: 'someone' } }
			)
		).toEqual({
			formData: { name: 'someone' },
			isDisplayed: false,
		});
	});

	it('should store the boolean value upon dispatch', () => {
		expect(
			reducer(
				{ formData: null, isDisplayed: false },
				{ type: actionTypes.DISPLAY_FORM, isDisplayed: true }
			)
		).toEqual({
			formData: null,
			isDisplayed: true,
		});
	});
});
