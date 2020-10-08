import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: null,
    id: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXTRACT_VAL:
            return {
                ...state,
                data: action.val,
                id: action.id,
            };
        default:
            return state;
    }
};

export default reducer;
