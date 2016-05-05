/* @flow */
/*eslint-disable prefer-const */
import React, {StyleSheet, Text, ListView, View, TouchableHighlight} from "react-native";
import Component from "../framework/component";

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
                        <Text style={styles.rowText}>
                            {this.props.rowData.title}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
    },
    rowText: {
        fontSize: 17,
        fontWeight: '500'
    }
});
