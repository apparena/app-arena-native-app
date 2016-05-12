/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ListView, View, TouchableHighlight, Image} from "react-native";
import Component from "../../../framework/component";
import {generalStyles} from "../../../framework/general";
import Icon from "react-native-vector-icons/FontAwesome";
import I18n from "react-native-i18n";

export default class AppList extends Component {
    _route() {
        this.props.navigator.push({
            title: JSON.stringify(this.props.rowData.appId),
            screen: "lists.Steps",
            passProps: {appId: this.props.rowData.appId}
        });
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._route.bind(this)}>
                    <View style={styles.row}>
                        <View style={styles.first}>
                            <Text style={styles.rowText}>
                                {I18n.t('app_id')} {this.props.rowData.appId}
                            </Text>
                            <Text style={styles.rowTextDesc}>
                                {this.props.rowData.name}
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Icon name="angle-right" size={35} color="#ccc"/>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({}));
