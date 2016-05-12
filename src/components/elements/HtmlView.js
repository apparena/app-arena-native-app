/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ScrollView, View, WebView, Image} from "react-native";
import Component from "../../framework/component";
import {generalStyles} from "../../framework/general";
import HtmlView from "react-native-htmlview";

export default class WebViewComponent extends Component {
    _route(uri) {
        console.log(uri);
        this.props.navigator.push({
            title: "News",
            screen: "elements.WebView",
            passProps: {uri}
        });
    }

    render() {
        return (
            <ScrollView>
                {this._renderNewsImage()}
                <View style={{padding:15}}>
                    <HtmlView
                        stylesheet={styles}
                        value={this.props.rowData.content.rendered}
                        onLinkPress={(url) => this._route(url)}
                    />
                </View>
            </ScrollView>
        );
    }

    _renderNewsImage() {
        var uri = (this.props.rowData._embedded['https://api.w.org/featuredmedia']) && this.props.rowData._embedded['https://api.w.org/featuredmedia'][0].source_url;
        if (uri) {
            return (
                <Image
                    resizeMode="cover"
                    style={styles.rowImage}
                    source={{uri}}
                />
            )
        }
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
    rowImage: {
        flex: 1,
        height: 200,
        overflow: "hidden"
    },
    img: {
        height: 0
    },
    h1: {
        fontSize: 17,
        fontWeight: '500'
    },
    h2: {
        fontSize: 17,
        fontWeight: '500'
    },
    h3: {
        fontSize: 17,
        fontWeight: '500'
    },
    h4: {
        fontSize: 17,
        fontWeight: '500'
    }
}));
