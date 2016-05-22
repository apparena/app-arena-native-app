import actionTypes from '../actions/types';

const defaultState = true;

/**
 * @return {boolean}
 */
export default function NetInfoReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.checkNetInfo:
            return action.payload;
        default:
            return state;
    }
}
