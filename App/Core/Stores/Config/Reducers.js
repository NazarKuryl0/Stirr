import * as actionTypes from './Constants';

const initialState = {
    data: null,
    isLoading: false,
    error: undefined,
};

const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONFIG:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case actionTypes.FETCH_CONFIG_SUCCEEDED:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case actionTypes.FETCH_CONFIG_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default configReducer;