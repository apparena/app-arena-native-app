import actionTypes from "../actions/types";
import jwtDecode from "jwt-decode";

const initialState = {
    status: null,
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.loginUser:
            if (action.payload.status === 200) {
                return Object.assign({}, state, {
                    'status': action.payload.status,
                    'isAuthenticating': false,
                    'isAuthenticated': true,
                    'token': action.payload.data[0],
                    'statusText': 'You have been successfully logged in.'
                }, jwtDecode(action.payload.data[0]));
            } else {
                return Object.assign({}, state, {
                    'status': action.payload.data.status,
                    'statusText': action.payload.data.message
                })
            }
        case actionTypes.checkAuthentication:
            if (action.payload) {
                return Object.assign({}, state, {
                    'status': 200,
                    'isAuthenticating': false,
                    'isAuthenticated': true,
                    'token': action.payload,
                    'statusText': 'You have been successfully logged in.'
                }, jwtDecode(action.payload));
            } else {
                return state;
            }
        case actionTypes.authenticate:
            if (action.token) {
                return Object.assign({}, state, {
                    'status': 200,
                    'isAuthenticating': false,
                    'isAuthenticated': true,
                    'token': action.token,
                    'statusText': 'You have been successfully logged in.'
                }, jwtDecode(action.token));
            } else {
                return state;
            }
        case actionTypes.logoutUser:
            return Object.assign({}, initialState, {
                'statusText': 'You have been successfully logged out.'
            });
        default:
            return state;
    }
}