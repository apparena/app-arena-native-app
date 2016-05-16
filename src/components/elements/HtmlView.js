/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ScrollView, View, WebView, Image, ActionSheetIOS} from "react-native";
import Component from "../../framework/component";
import {generalStyles} from "../../framework/general";
import HtmlView from "react-native-htmlview";
import moment from "moment";
import I18n from "react-native-i18n";

export default class WebViewComponent extends Component {
    constructor(props, children) {
        super(props, children);
        this.state = this.getInitState ? this.getInitState() : {};
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.navigator.setButtons({
            rightButtons: [
                {
                    title: I18n.t('share'), // for a textual button, provide the button title (label)
                    id: 'share', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                    disabled: false // optional, used to disable the button (appears faded and doesn't interact)
                }
            ]// see "Adding buttons to the navigator" below for format (optional)
        });
    }


    _route(uri) {
        this.props.navigator.push({
            title: "News",
            screen: "elements.WebView",
            passProps: {uri}
        });
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'share') { // this is the same id field from the static navigatorButtons definition
                this.showShareActionSheet();
            }
        }
    }

    render() {
        return (
            <ScrollView>
                {this._renderNewsImage()}
                <View style={{padding:15}}>
                    <Text style={styles.date}>{moment(this.props.rowData.date).format("DD.MM.YYYY")}</Text>
                    <Text style={styles.headline}>{this.props.rowData.title.rendered}</Text>

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

    showShareActionSheet() {
        ActionSheetIOS.showShareActionSheetWithOptions({
                url: this.props.rowData.link,
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            },
            (error) => alert(error),
            (success, method) => {
                var text;
                if (success) {
                    text = `Shared via ${method}`;
                } else {
                    text = 'You didn\'t share';
                }
                this.setState({text});
            });
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
    rowImage: {
        flex: 1,
        height: 200,
        overflow: "hidden"
    },
    headline: {
        fontWeight: "500",
        fontSize: 18
    },
    date: {
        fontWeight: "normal",
        fontSize: 14,
        paddingBottom: 10
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
