import React, {AsyncStorage, PickerIOS, Text, View} from "react-native";
import actionTypes from "../actions/types";
import {loginUser} from "../helpers/helpers";

export function login(email, password) {
    let request = loginUser(email, password);
    return {
        type: actionTypes.loginUser,
        payload: request
    }
}