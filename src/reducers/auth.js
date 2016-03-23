import actionTypes from '../actions/types';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.loginUser:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': true,
                'token': action.payload.data[0],
                'userId': jwtDecode(action.payload.data[0]).userId,
                'statusText': 'You have been successfully logged in.'
            });
        default:
            return state;
    }
}