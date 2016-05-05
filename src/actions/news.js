import actionTypes from './types';

import {getNewsAction} from '../helpers/helpers'


export function getNews() {
    const request = getNewsAction();
    return {
        type: actionTypes.getNews,
        payload: request
    }
}