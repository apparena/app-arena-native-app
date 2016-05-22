import {AsyncStorage} from "react-native";
import actionTypes from "../actions/types";
import {loginUser, registerUser, createCompanyAction} from "../helpers/helpers";

export function login(email, password) {
    let request = loginUser(email, password);
    return {
        type: actionTypes.loginUser,
        payload: request
    }
}

export function register(username, email, password, companyId, firstname, lastname) {
    let request = registerUser(username, email, password, companyId, firstname, lastname);
    return {
        type: actionTypes.registerUser,
        payload: request
    }
}

export function createCompany(companyName) {
    let request = createCompanyAction(companyName);
    return {
        type: actionTypes.registerCompany,
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