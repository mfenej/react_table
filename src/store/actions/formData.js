import * as actionTypes from '../actions/actionTypes';

export const extractClient = (client) => {
	return {
		type: actionTypes.EXTRACT_CLIENT,
		client,
	};
};

export const displayForm = (isDisplayed) => {
	return {
		type: actionTypes.DISPLAY_FORM,
		isDisplayed,
	};
};
