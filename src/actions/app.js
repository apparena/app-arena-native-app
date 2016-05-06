import {AsyncStorage} from "react-native";
import actionTypes from "./types";
import jwtDecode from "jwt-decode";
import Icon from "react-native-vector-icons/Ionicons";

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

        //Get Tab Icons
        if (startRoot == 'after-login') {
            var icons = {
                person_selected: await Icon.getImageSource('ios-person', 30, '#2D343D'),
                person: await Icon.getImageSource('ios-person-outline', 30, '#2D343D'),
                world_selected: await Icon.getImageSource('ios-world', 30, '#2D343D'),
                world: await Icon.getImageSource('ios-world-outline', 30, '#2D343D'),
                list_selected: await Icon.getImageSource('ios-list', 30, '#2D343D'),
                list: await Icon.getImageSource('ios-list-outline', 30, '#2D343D'),
                chatboxes_selected: await Icon.getImageSource('ios-chatboxes', 30, '#2D343D'),
                chatboxes: await Icon.getImageSource('ios-chatboxes-outline', 30, '#2D343D')
            };
            dispatch(addIcon(icons));
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

export function addIcon(icons) {
    return {
        type: actionTypes.addIcon,
        icons
    }
}

export function changeAppRoot(root) {
    return {
        type: actionTypes.rootChanged,
        root: root
    };
}