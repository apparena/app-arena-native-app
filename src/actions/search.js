import actionTypes from "./types";
import update from "react-addons-update";

export function searchWizard(query, configResult, translationResult) {
    var configSearchResult = {}, translationSearchResult = {};
    if (Object.keys(configResult).length) {
        Object.keys(configResult).map((k) => {
            if (typeof configResult[k] === "object") {
                configSearchResult[k] = update(configResult[k], {$merge: {'display': (configResult[k].name.toLowerCase().indexOf(query.toLowerCase()) != -1 || configResult[k].configId.toLowerCase().indexOf(query.toLowerCase()) != -1)}});
            } else {
                configSearchResult[k] = configResult[k];
            }
        });
    }
    if (Object.keys(translationResult).length) {
        Object.keys(translationResult).map((k) => {
            if (typeof translationResult[k] === "object") {
                translationSearchResult[k] = update(translationResult[k], {$merge: {'display': (translationResult[k].translation.toLowerCase().indexOf(query.toLowerCase()) != -1 || translationResult[k].translationId.toLowerCase().indexOf(query.toLowerCase()) != -1)}});
            } else {
                translationSearchResult[k] = translationResult[k];
            }
        });
    }
    return {
        type: actionTypes.searchWizard,
        query,
        configSearchResult,
        translationSearchResult
    };
}