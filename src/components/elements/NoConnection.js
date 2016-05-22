/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Component from "../../framework/component";
import {generalStyles} from "../../framework/general";
import Icon from "react-native-vector-icons/FontAwesome";
import I18n from "react-native-i18n";

export default class WebViewComponent extends Component {
    render() {
        return (
            <View style={styles.page}>
                <View style={styles.noConnection}>
                    <Icon style={styles.noConnectionIcon} name="wifi" size={40} color="#858585"/>
                    <Text style={styles.noConnectionInfo}>{I18n.t('no_connection_info')}</Text>
                </View>
            </View>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
    noConnection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    noConnectionIcon: {},
    noConnectionInfo: {
        margin: 20,
        color: '#858585',
        width: 200,
        textAlign: 'center'
    }

}));
