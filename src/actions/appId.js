import actionTypes from './types';

export function initAppId(appId) {
    return {
        type: actionTypes.initAppId,
        appId
    };
}