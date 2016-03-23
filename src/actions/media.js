import actionTypes from './types';

import {getAllMediaAction, uploadCompanyMediaAction} from '../helpers/helpers'

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

export function uploadCompanyMedia(companyId, filename, file) {
    const request = uploadCompanyMediaAction(companyId, filename, file);
    return {
        type: actionTypes.uploadCompanyMedia,
        payload: request
    };
}
