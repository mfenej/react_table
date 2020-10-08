import * as actionTypes from '../actions/actionTypes';

export const extractVal = (val,id) => {
    return {
        type: actionTypes.EXTRACT_VAL,
        val,
        id,
    };
};
