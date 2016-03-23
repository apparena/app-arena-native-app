import actionTypes from '../actions/types';

const defaultState = false;

export default function adminReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.searchWizard:
            return !!action.query;
        default:
            return state;
    }
}
