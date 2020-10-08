import * as actionTypes from '../actions/actionTypes';

const initialState = {
	formData: null,
	isDisplayed: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.EXTRACT_CLIENT:
			return {
				...state,
				formData: action.client,
			};

		case actionTypes.DISPLAY_FORM:
			return {
				...state,
				isDisplayed: action.isDisplayed,
			};

		default:
			return state;
	}
};

export default reducer;
