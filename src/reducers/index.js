import {combineReducers} from "redux";
import admin from "./admin";
import app from './app';
import appId from "./appId";
import appInfo from "./appInfo";
import apps from "./apps";
import auth from "./auth";
import config from "./config";
import counter from './counter';
import display from "./display";
import icons from "./icons";
import locale from "./locale";
import media from "./media";
import netInfo from "./netInfo";
import news from "./news";
import overlays from "./overlays";
import search from "./search";
import translation from "./translation";
import user from "./user";
import wizard from "./wizard";

const rootReducer = combineReducers({
    admin,
    app,
    appId,
    appInfo,
    apps,
    auth,
    config,
    counter,
    display,
    icons,
    locale,
    media,
    netInfo,
    news,
    overlays,
    search,
    translation,
    user,
    wizard
});

export default rootReducer