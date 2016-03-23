import actionTypes from "../actions/types";
import update from "react-addons-update";

const defaultState = [];

export default function translationReducer(state = defaultState, action = {}) {
    var newTranslation = {}, translation = {};
    switch (action.type) {
        case actionTypes.getAllTranslationStrings:
            if (action.payload.data) {
                translation = action.payload.data._embedded.data;
                Object.keys(translation).map((k) => {
                    if (typeof translation[k] === 'object') {
                        newTranslation[k] = update(translation[k], {$merge: {display: true}});
                    } else {
                        newTranslation[k] = translation[k];
                    }
                });
            }
            return Object.assign({}, state, newTranslation);
        case actionTypes.updateTranslationString:
            return update(state, {
                [action.payload.data.data.translationId]: {
                    $merge: Object.assign(action.payload.data.data, {display: true})
                }
            });
        case actionTypes.searchWizard:
            if (Object.keys(action.translationSearchResult).length) {
                return Object.assign({}, state,
                    action.translationSearchResult
                );
            } else {
                return state;
            }
        default:
            return state;
    }
}
