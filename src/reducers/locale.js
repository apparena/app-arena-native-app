import actionTypes from '../actions/types';

const defaultState = "de_DE";

export default function localeReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.getAppInfo:
            if (action.payload.data._embedded.data) {
                return action.payload.data._embedded.data.App.lang;
            } else {
                return state;
            }
        case actionTypes.setLocale:
            if (action.payload.data._embedded.data) {
                return action.payload.data._embedded.data.App.lang;
            } else {
                return state;
            }
        default:
            return state;
    }
}
