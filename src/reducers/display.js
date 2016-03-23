import filter from 'lodash.filter';

import actionTypes from '../actions/types';

const defaultState = {search: true, sidebar: true};

export default function displayReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.toggleSearch:
            return Object.assign({}, state, {
                search: action.search
            });
        case actionTypes.toggleSidebar:
            return Object.assign({}, state, {
                sidebar: action.sidebar
            });
        default:
            return state;
    }
}
