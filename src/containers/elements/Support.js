import * as authActions from "../../actions/auth";
import * as userActions from "../../actions/user";
import React from 'react';
import {Text, Image, View, ScrollView, TouchableOpacity, StyleSheet, WebView} from "react-native";
import Component from "../../framework/component";
import I18n from 'react-native-i18n';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// this is a traditional React component connected to the redux store
class ConfigElement extends Component {
    render() {
        return (
            <View style={styles.page}>
                <WebView
                    style={{height: 500}}
                    source={require('../../components/elements/support.html')}
                    scalesPageToFit={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    }
});


export default connect(
    (state) => ({
        auth: state.auth,
        user: state.user
    }),
    (dispatch) => ({
        ...bindActionCreators(authActions, dispatch),
        ...bindActionCreators(userActions, dispatch)
    })
)(ConfigElement);
