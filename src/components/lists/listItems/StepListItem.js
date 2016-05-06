/* @flow */
/*eslint-disable prefer-const */
import React from 'react';
import {StyleSheet, Text, ListView, View, TouchableHighlight, Switch, Image} from "react-native";
import Component from "../../../framework/component";
import Icon from "react-native-vector-icons/FontAwesome";

export default class AppList extends Component {
    _route() {
        this.props.navigator.push({
            title: this.props.config[this.props.rowData.identifier].name,
            screen: "elements.ConfigElement",
            passProps: {data: this.props.config[this.props.rowData.identifier]}
        });
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._route.bind(this)}>
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

var styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        flex: 1,
        flexDirection: 'row'
    },
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
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15
    },
    rowText: {
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 25
    },
    rowTextDesc: {
        paddingTop: 2,
        fontSize: 12,
        fontWeight: 'normal'
    },
});
