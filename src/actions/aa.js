import actionTypes from './types';

import {getAppInfoAction, getAllConfig, getWizardJSON, updateConfigValueAction, getAllMediaAction, uploadCompanyMediaAction, getAllTranslationStringsAction} from '../helpers/requests'

export function initAppId(appId) {
    return {
        type: actionTypes.initAppId,
        appId
    };
}

export function getAppInfo(appId) {
    const request = getAppInfoAction(appId);
    return {
        type: actionTypes.getAppInfo,
        payload: request
    }
}

export function initAppArenaConfig(appId) {
    const request = getAllConfig(appId);
    return {
        type: actionTypes.initAppArenaConfig,
        payload: request
    };
}

export function getAllMedia(companyId, params) {
    const request = getAllMediaAction(companyId, params);
    return {
        type: actionTypes.getAllMedia,
        payload: request
    };
}

export function addMedia(files) {
    return {
        type: actionTypes.addMedia,
        files
    };
}

export function getAllTranslationStrings(companyId) {
    const request = getAllTranslationStringsAction(companyId);
    return {
        type: actionTypes.getAllTranslationStrings,
        payload: request
    };
}

export function updateTranslationStrings(appId, translation_id, value) {
    const request = updateTranslationStringsAction(appId, translation_id, value);
    return {
        type: actionTypes.getAllTranslationStrings,
        payload: request
    };
}

export function initAppArenaWizard(appId) {
    const request = getWizardJSON(appId);
    return {
        type: actionTypes.initAppArenaWizard,
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

export function uploadCompanyMedia(companyId, filename, file) {
    const request = uploadCompanyMediaAction(companyId, filename, file);
    return {
        type: actionTypes.uploadCompanyMedia,
        payload: request
    };
}
