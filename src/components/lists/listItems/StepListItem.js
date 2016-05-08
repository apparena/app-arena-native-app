/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ListView, View, TouchableHighlight, Switch, Image} from "react-native";
import Component from "../../../framework/component";
import {generalStyles} from "../../../framework/general";
import Icon from "react-native-vector-icons/FontAwesome";

export default class AppList extends Component {
    _onPress() {
        this.props.navigator.push({
            title: this.props.config[this.props.rowData.identifier].name,
            screen: "elements.ConfigElement",
            passProps: {data: this.props.config[this.props.rowData.identifier]}
        });
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._onPress.bind(this)}>
                    <View style={styles.row}>
                        <View style={(this.props.config[this.props.rowData.identifier].type == "checkbox") ? styles.first : styles.firstCheckbox}>
                            <Text style={styles.rowText}>
                                {this.props.config[this.props.rowData.identifier].name}
                            </Text>
                        </View>
                        {this._renderElement()}
                    </View>
                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        );
    }

    updateValue(value) {
        this.setState({value});
    }

    _renderElement() {
        if (this.props.config[this.props.rowData.identifier].type == "checkbox") {
            var value = (this.props.config[this.props.rowData.identifier].value == "1");
            return (
                <View style={styles.secondCheckbox}>
                    <Switch
                        {...this.props}
                        value={value}
                        onValueChange={this.updateValue.bind(this)}/>
                </View>
            )
        } else {
            return (
                <View style={styles.second}>
                    <Icon name="angle-right" size={25} color="#ccc"/>
                </View>
            )
        }
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
    first: {
        flex: .95
    },
    firstCheckbox: {
        flex: .85
    },
    second: {
        flex: .05
    },
    secondCheckbox: {
        flex: .15
    },
    rowTextDesc: {
        paddingTop: 2,
        fontSize: 12,
        fontWeight: 'normal'
    }
}));
