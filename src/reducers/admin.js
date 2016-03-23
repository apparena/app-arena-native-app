import actionTypes from '../actions/types';

const defaultState = false;

export default function adminReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.activateAdminMode:
            return action.admin;
        default:
            return state;
    }
}
