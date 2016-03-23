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
                    'userId': jwtDecode(action.payload.data[0]).userId,
                    'statusText': 'You have been successfully logged in.'
                });
            } else {
                return Object.assign({}, state, {
                    'status': action.payload.data.status,
                    'statusText': action.payload.data.message
                })
            }
        case actionTypes.authenticateUser:
            return Object.assign({}, state, {
                'status': 200,
                'isAuthenticating': false,
                'isAuthenticated': true,
                'token': action.token,
                'userId': jwtDecode(action.token).userId,
                'statusText': 'You have been successfully logged in.'
            });
        default:
            return state;
    }
}