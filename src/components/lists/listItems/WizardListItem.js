/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ListView, View, TouchableHighlight} from "react-native";
import Component from "../../../framework/component";
import {generalStyles} from "../../../framework/general";
import Icon from "react-native-vector-icons/FontAwesome";

export default class AppList extends Component {
    _route() {
        this.props.navigator.push({
            title: this.props.rowData.title,
            screen: "lists.Step",
            passProps: {
                appId: this.props.appId,
                rowData: this.props.rowData
            }
        });
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._route.bind(this)}>
                    <View style={styles.row}>
                        <View style={styles.first}>
                            <Text style={styles.rowText}>
                                {this.props.rowData.title}
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Icon name="angle-right" size={25} color="#ccc"/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({}));
