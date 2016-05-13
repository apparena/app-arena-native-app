/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ListView, View, TouchableHighlight, Switch, Image} from "react-native";
import Component from "../../../framework/component";
import {generalStyles} from "../../../framework/general";
import Icon from "react-native-vector-icons/FontAwesome";

export default class AppList extends Component {
    getInitState() {
        return ({
            value: (this.props.config[this.props.rowData.identifier].value == "1")
        });
    }

    _onPress() {
        this.props.navigator.push({
            title: this.props.config[this.props.rowData.identifier].name,
            screen: "elements.ConfigElement",
            passProps: {configId: this.props.rowData.identifier}
        });
    }

    render() {
        return this._renderElement();
    }

    updateValue(value) {
        this.setState({value});
        this.props.updateCheckbox(this.props.rowData.identifier, this.state.value)
    }

    _renderElement() {
        if (this.props.config[this.props.rowData.identifier].type == "html" || this.props.config[this.props.rowData.identifier].type == "css") {
            return (
                <View>
                </View>
            );
        }

        if (this.props.config[this.props.rowData.identifier].type == "checkbox") {
            return (
                <View>
                    <View style={styles.row}>
                        <View style={(this.props.config[this.props.rowData.identifier].type == "checkbox") ? styles.first : styles.firstCheckbox}>
                            <Text style={styles.rowText}>
                                {this.props.config[this.props.rowData.identifier].name}
                            </Text>
                        </View>
                        <View style={styles.secondCheckbox}>
                            <Switch
                                {...this.props}
                                value={this.state.value}
                                onValueChange={this.updateValue.bind(this)}/>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            )
        } else {
            return (
                <View>
                    <TouchableHighlight onPress={this._onPress.bind(this)}>
                        <View style={styles.row}>
                            <View style={(this.props.config[this.props.rowData.identifier].type == "checkbox") ? styles.first : styles.firstCheckbox}>
                                <Text style={styles.rowText}>
                                    {this.props.config[this.props.rowData.identifier].name}
                                </Text>
                            </View>
                            <View style={styles.second}>
                                <Icon name="angle-right" size={25} color="#ccc"/>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.separator}/>
                </View>
            )
        }
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({}));
