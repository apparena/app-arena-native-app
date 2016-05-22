import actionTypes from './types';

import {getApps} from '../helpers/requests'


export function getUsersApps(token) {
    const request = getApps(token);
    return {
        type: actionTypes.getUserApps,
        payload: request
    }
}