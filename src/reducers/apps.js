import actionTypes from "../actions/types";

const defaultState = [];

export default function appsReducer(state = defaultState, action = {}) {
    var apps = {};
    switch (action.type) {
        case actionTypes.getUserApps:
            if (action.payload) {
                apps = action.payload.data._embedded.data;
            }
            return Object.assign({}, state, apps);
        default:
            return state;
    }
}
