import * as types from './actionTypes';
//import api from 'api';

function one() {
    return { type: types.ONE };
}

function successCall(data) {
    return {type: types.SUCCESS, data}
}

function failedCall(data) {
    return {type: types.FAILED, data}
}

export function three(data) {
    return (dispatch, getState) => {
        dispatch(/*one()*/);

        return api.asyncCall(data).then(response => {
            dispatch(successCall(response));
        }).catch(error => {
            dispatch(failedCall(error));
        })
    }
}