/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ListView, View, TouchableHighlight, Image} from "react-native";
import Component from "../../../framework/component";
import _ from "lodash";

export default class AppList extends Component {
    _route() {
        this.props.navigator.push({
            title: "News",
            screen: "elements.WebView",
            passProps: {uri: this.props.rowData.link}
        });
    }

    render() {
        var date = new Date(this.props.rowData.date);
        return (
            <View>
                <TouchableHighlight onPress={this._route.bind(this)}>
                    <View>
                        <Image
                            resizeMode="cover"
                            style={styles.rowImage}
                            source={{uri: this.props.rowData._embedded['https://api.w.org/featuredmedia'][0].source_url}}
                        />
                        <View style={styles.row}>
                            <Text style={styles.rowText}>
                                {_.unescape(this.props.rowData.title.rendered.replace("&#8211;", '-'))}
                            </Text>
                            <Text style={styles.rowDate}>
                                {date.toLocaleDateString()}
                            </Text>
                        </View>
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
        paddingHorizontal: 15,
        paddingVertical: 15,
        flex: 1,
        flexDirection: 'row'
    },
    separator: {
        height: 5,
        backgroundColor: '#ccc'
    },
    rowText: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'left',
        flex: 0.8
    },
    rowImage: {
        flex: 1,
        height: 100,
        overflow: "hidden"
    },
    rowDate: {
        fontSize: 10,
        fontWeight: '300',
        textAlign: 'right',
        flex: 0.2
    },
    rowTextDesc: {
        paddingTop: 2,
        fontSize: 12,
        fontWeight: 'normal'
    }
});
