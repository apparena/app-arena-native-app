import actionTypes from './types';

import {getAppInfoAction, getAllConfig, getWizardJSON, updateConfigValueAction, getAllMediaAction, uploadCompanyMediaAction, getAllTranslationStringsAction, updateTranslationStringsAction} from '../helpers/helpers'

export function initAppArenaConfig(appId) {
    const request = getAllConfig(appId);
    return {
        type: actionTypes.initAppArenaConfig,
        payload: request
    };
}

export function updateConfigValue(appId, config_id, value) {
    const request = updateConfigValueAction(appId, config_id, value);
    return {
        type: actionTypes.updateConfigValue,
        payload: request
    };
}