import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function <%= parentComponentReducer %>(state = initialState, action) {
    switch (action.type) {
        case types.MY_CONST:
            return [
                ...state,
                Object.assign({}, action.data)
            ];

        case types.MY_CONST_2:
            return [
                ...state,
                Object.assign({}, action.data)
            ];

        default:
            return state;
    }
}