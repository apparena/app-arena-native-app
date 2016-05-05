import actionTypes from './types';

import {getCurrentUserAction} from '../helpers/helpers'

export function getCurrentUser(companyId, userId) {
    const request = getCurrentUserAction(companyId, userId);
    return {
        type: actionTypes.getCurrentUser,
        payload: request
    }
}
