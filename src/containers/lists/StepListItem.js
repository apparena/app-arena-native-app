/* @flow */
/*eslint-disable prefer-const */
import React, {StyleSheet, Text, ListView, View, TouchableHighlight, Switch} from "react-native";
import Component from "../../framework/component";
import Step from "./Step";

export default class AppList extends Component {

    _route() {
        this.props.navigator.push({
            title: JSON.stringify(this.props.rowData.title),
            component: Step,
            navigationBarHidden: false,
            barStyle: "light-content",
            passProps: {...this.props}
        });
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._route.bind(this)}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>
                            {this.props.config[this.props.rowData.identifier].name}
                        </Text>
                        {this._renderDescription()}
                        {this._renderCheckboxElement()}
                    </View>
                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        );
    }

    _renderDescription() {
        if (this.props.config[this.props.rowData.identifier].description) {
            return (
                <Text style={styles.rowTextDesc}>
                    {this.props.config[this.props.rowData.identifier].description}
                </Text>
            )
        }
    }

    updateValue(value) {
        this.setState({value});
    }

    _renderCheckboxElement() {
        if (this.props.config[this.props.rowData.identifier].type == "checkbox") {
            var value = (this.props.config[this.props.rowData.identifier].value == "1");
            return (
                <Switch
                    {...this.props}
                    value={value}
                    onValueChange={this.updateValue.bind(this)}/>
            )
        }
    }
}

var styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15
    },
    rowText: {
        fontSize: 17,
        fontWeight: '500'
    },
    rowTextDesc: {
        paddingTop: 2,
        fontSize: 12,
        fontWeight: 'normal'
    },
});
