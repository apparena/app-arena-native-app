import {AsyncStorage} from "react-native";
import actionTypes from "./types";
import jwtDecode from "jwt-decode";

export function appInitialized() {
    return async function (dispatch, getState) {
        let startRoot = "login";
        // since all business logic should be inside redux actions
        // this is a good place to put your app initialization code
        var token = await AsyncStorage.getItem('token');
        if (token && (Date.now() / 1000) <= jwtDecode(token).exp) {
            startRoot = 'after-login';
            dispatch(authenticate(token));
        }
        dispatch(changeAppRoot(startRoot));
    };
}

export function checkAuthentication() {
    let request = AsyncStorage.getItem('token');
    return {
        type: actionTypes.checkAuthentication,
        payload: request
    }
}

export function authenticate(token) {
    return {
        type: actionTypes.authenticate,
        token
    }
}

export function changeAppRoot(root) {
    return {
        type: actionTypes.rootChanged,
        root: root
    };
}