import actionTypes from "../actions/types";

const defaultState = [];

export default function newsReducer(state = defaultState, action = {}) {
    var news = {};
    switch (action.type) {
        case actionTypes.getNews:
            if (action.payload) {
                news = action.payload.data;
            }
            return Object.assign({}, state, news);
        default:
            return state;
    }
}
