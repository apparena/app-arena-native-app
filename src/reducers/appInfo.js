import actionTypes from '../actions/types';
import update from 'react-addons-update'

const defaultState = [];

export default function appInfoReducer(state = defaultState, action = {}) {
    var app = {};
    switch (action.type) {
        case actionTypes.getAppInfo:
            if (action.payload.data) {
                app = action.payload.data._embedded.data;
            }
            return Object.assign({}, state, app);
        default:
            return state;
    }
}
