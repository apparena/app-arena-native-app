import actionTypes from '../actions/types';

const defaultState = false;

export default function AppIdReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.initAppId:
            return action.appId;
        default:
            return state;
    }
}
