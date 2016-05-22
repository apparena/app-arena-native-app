import actionTypes from './types';

import {getAllTranslationStringsAction, updateTranslationStringAction} from '../helpers/requests'

export function getAllTranslationStrings(companyId) {
    const request = getAllTranslationStringsAction(companyId);
    return {
        type: actionTypes.getAllTranslationStrings,
        payload: request
    };
}

export function updateTranslationString(appId, translation_id, value) {
    const request = updateTranslationStringAction(appId, translation_id, value);
    return {
        type: actionTypes.updateTranslationString,
        payload: request
    };
}