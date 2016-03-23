import {combineReducers} from 'redux';

import admin from './admin';
import app from './appInfo';
import appId from './appId';
import auth from './auth';
import config from './config';
import display from './display';
import locale from './locale';
import media from './media';
import overlays from './overlays';
import search from './search';
import translation from './translation';
import wizard from './wizard';

const rootReducer = combineReducers({
    admin,
    app,
    appId,
    auth,
    config,
    display,
    locale,
    media,
    overlays,
    search,
    translation,
    wizard
});

export default rootReducer