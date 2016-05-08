/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ListView, View, WebView} from "react-native";
import Component from "../../framework/component";

export default class WebViewComponent extends Component {
    render() {
        return (
            <View>
                <WebView
                    style={{height: 1000}}
                    source={{uri: this.props.uri}}
                    scalesPageToFit={true}
                />
            </View>
        );
    }
}
