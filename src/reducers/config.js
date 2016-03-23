import actionTypes from "../actions/types";
import update from "react-addons-update";

const defaultState = [];

export default function configDataReducer(state = defaultState, action = {}) {
    var newConfig = {}, config = {};
    switch (action.type) {
        case actionTypes.initAppArenaConfig:
            if (action.payload.data) {
                config = action.payload.data._embedded.data;
                Object.keys(config).map((k) => {
                    if (typeof config[k] === 'object') {
                        newConfig[k] = update(config[k], {$merge: {display: true}});
                    } else {
                        newConfig[k] = config[k];
                    }
                });
            }
            return Object.assign({}, state, newConfig);
        case actionTypes.updateConfigValue:
            return update(state, {
                [action.payload.data.data.configId]: {
                    $merge: Object.assign(action.payload.data.data, {display: true})
                }
            });
        case actionTypes.searchWizard:
            if (Object.keys(action.configSearchResult).length) {
                return Object.assign({}, state,
                    action.configSearchResult
                );
            } else {
                return state;
            }
        default:
            return state;
    }
}
