import actionTypes from './types';

import {getApps} from '../helpers/helpers'


export function getUsersApps(token) {
    const request = getApps(token);
    return {
        type: actionTypes.getUserApps,
        payload: request
    }
}