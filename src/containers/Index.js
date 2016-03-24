import {authenticateUser} from "../actions/auth";
import React from "react-native";
import Component from "../framework/component";
import {Provider} from "react-redux";
import configureStore from "../helpers/configure-store";
import Application from "./scene";

const state = window.__initialState;
const store = configureStore(state);

export default class Root extends Component {

    componentWillMount() {
        store.dispatch(authenticateUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Application />
            </Provider>
        );
    }
}