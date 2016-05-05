import actionTypes from '../actions/types';
import update from 'react-addons-update'

const defaultState = [];

export default function userReducer(state = defaultState, action = {}) {
    var user = {};
    switch (action.type) {
        case actionTypes.getCurrentUser:
            if (action.payload.data) {
                user = action.payload.data._embedded.data;
            }
            return Object.assign({}, state, user);
        default:
            return state;
    }
}
