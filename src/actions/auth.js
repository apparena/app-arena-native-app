import {AsyncStorage} from "react-native";
import actionTypes from "../actions/types";
import {loginUser} from "../helpers/helpers";

export function login(email, password) {
    let request = loginUser(email, password);
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