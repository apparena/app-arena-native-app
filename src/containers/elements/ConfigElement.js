import * as authActions from "../../actions/auth";
import * as userActions from "../../actions/user";
import React from 'react';
import {Text, Image, View, ScrollView, TouchableOpacity, StyleSheet, Alert} from "react-native";
import Component from "../../framework/component";
import I18n from 'react-native-i18n';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// this is a traditional React component connected to the redux store
class ConfigElement extends Component {
    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Speichern', // for a textual button, provide the button title (label)
                id: 'save', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                disabled: false // optional, used to disable the button (appears faded and doesn't interact)
            }
        ]
    };

    constructor(props, children) {
        super(props, children);
        this.state = this.getInitState ? this.getInitState() : {};
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    getInitState() {
        return ({
            user: {}
        });
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'save') { // this is the same id field from the static navigatorButtons definition
                this.props.logout();
            }
        }
    }

    render() {
        return (
            <View style={styles.page}>
                {this._renderDescription()}
            </View>
        );
    }


    _renderDescription() {
        if (this.props.data.description) {
            return (
                <Text style={styles.rowTextDesc}>
                    {this.props.data.description}
                </Text>
            )
        }
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
