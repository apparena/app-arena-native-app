/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ListView, View, WebView, Dimensions} from "react-native";
import Component from "../../framework/component";

export default class WebViewComponent extends Component {
    getInitState() {
        return {
            url: this.props.uri,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true
        };
    }

    render() {
        return (
            <View>
                <WebView
                    ref={"webview"}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
            </View>
        );
    }

    onNavigationStateChange(navState) {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true
        });
    }

    onShouldStartLoadWithRequest(event) {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    }
}

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    webView: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: height-118,
    },
});
