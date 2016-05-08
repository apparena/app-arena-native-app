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
        fontSize: 15,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
        marginLeft: 15,
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