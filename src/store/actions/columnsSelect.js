import * as actionTypes from '../actions/actionTypes';

export const extractColumns = columns => {
    return {
        type: actionTypes.EXTRACT_COLUMNS,
        columns,
    };
};
