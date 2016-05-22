import actionTypes from './types';

import {getCurrentUserAction, updateCurrentUserAction} from '../helpers/requests'

export function getCurrentUser(companyId, userId) {
    const request = getCurrentUserAction(companyId, userId);
    return {
        type: actionTypes.getCurrentUser,
        payload: request
    }
}

export function updateCurrentUser(companyId, userId, data) {
    const request = updateCurrentUserAction(companyId, userId, data);
    return {
        type: actionTypes.updateCurrentUser,
        payload: request
    }
}
