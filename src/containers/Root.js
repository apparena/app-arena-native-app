/* @flow */
import React from "react-native";
import Component from '../framework/component'
import { Provider } from "react-redux";
import configureStore from "../helpers/configure-store";
import Main from "../components/main";

const state = window.__initialState;
const store = configureStore(state);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}