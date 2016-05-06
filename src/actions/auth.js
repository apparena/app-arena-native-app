import {AsyncStorage} from "react-native";
import actionTypes from "../actions/types";
import {loginUser, registerAction, createCompanyAction} from "../helpers/helpers";

export function login(email, password) {
    let request = loginUser(email, password);
    return {
        type: actionTypes.loginUser,
        payload: request
    }
}

export function register(email, password, companyName) {
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
    let request = registerUser(email, password);
    return {
        type: actionTypes.loginUser,
        payload: request
    }
}

export function createCompany(companyName) {
    let request = createCompanyAction(companyName);
    return {
        type: actionTypes.loginUser,
        payload: request
    }
}


export function logout() {
    let request = AsyncStorage.removeItem('token');
    return {
        type: actionTypes.logoutUser,
        payload: request
    }
}