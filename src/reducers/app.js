import actionTypes from "../actions/types";
import Immutable from "seamless-immutable";

const initialState = Immutable({
    root: undefined, // 'login' / 'after-login'
    icons: {}
});

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.rootChanged:
            return state.merge({
                root: action.root
            });
        case actionTypes.addIcon:
            return state.merge({
                icons: action.icons
            });
        default:
            return state;
    }
}
