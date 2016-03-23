import actionTypes from './types';

export function toggleSidebar(show = true) {
    return {
        type: actionTypes.toggleSidebar,
        sidebar: show
    };
}

export function toggleSearch(show = true) {
    return {
        type: actionTypes.toggleSearch,
        search: show
    };
}
