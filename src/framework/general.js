import React from "react";
import {StyleSheet, Text, View, ActivityIndicatorIOS} from "react-native";
import I18n from "react-native-i18n";


export var generalStyles = StyleSheet.create({
    row: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flex:1,
        flexDirection:'row'
    },
    rowText: {
        fontSize: 15
    },
    first: {
        flex: .95,
        justifyContent: 'center'
    },
    firstCheckbox: {
        flex: .80,
        justifyContent: 'center'
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
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
        paddingLeft: 15,
    },
    loader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    page: {
        flex: 1,
        backgroundColor: '#ebebeb'
    },
    loaderText: {
        paddingLeft: 10,
        fontWeight: '100'
    }
});

export function renderPlaceholderView() {
    return (
        <View style={generalStyles.loader}>
            <ActivityIndicatorIOS
                animating={true}
                size="small"
            />
            <Text style={generalStyles.loaderText}>
                {I18n.t('loading')}
            </Text>
        </View>
    );
}