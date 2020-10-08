import * as actionTypes from '../actions/actionTypes';

const initialState = {
    columns: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXTRACT_COLUMNS:
            return {
                ...state,
                columns: action.columns
            };
        default:
            return state;
    }
};

export default reducer;
