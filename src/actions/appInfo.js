import actionTypes from './types';

import {getAppInfoAction} from '../helpers/requests'

export function getAppInfo(appId) {
    const request = getAppInfoAction(appId);
    return {
        type: actionTypes.getAppInfo,
        payload: request
    }
}
