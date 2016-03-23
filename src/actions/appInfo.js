import actionTypes from './types';

import {getAppInfoAction} from '../helpers/helpers'

export function getAppInfo(appId) {
    const request = getAppInfoAction(appId);
    return {
        type: actionTypes.getAppInfo,
        payload: request
    }
}
