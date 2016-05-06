import * as authActions from "../../actions/auth";
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    WebView,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import Component from "../../framework/component";
import I18n from "react-native-i18n";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Icon from 'react-native-vector-icons/FontAwesome';

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: .5,
        backgroundColor: '#2D343D'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#478AB8',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
        marginLeft: 15,
        width: 20,
        height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
        alignItems: 'flex-end',
        padding: 15,
    },
    greyFont: {
        color: '#D8D8D8'
    },
    whiteFont: {
        color: '#FFF'
    }
});

class Register extends Component {
    getInitState() {
        return ({
            email: 'v.klein@app-arena.com',
            password: '1234',
            errorMessage: ''
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.mark} source={require('../../../assets/img/apparena.png')}/>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputUsername} name="user" size={22} color="#fff"/>
                        <TextInput
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("Username")}
                            placeholderTextColor="#FFF"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputPassword} name="lock" size={22} color="#fff"/>
                        <TextInput
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("Pasword")}
                            placeholderTextColor="#FFF"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputPassword} name="lock" size={22} color="#fff"/>
                        <TextInput
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("Pasword")}
                            placeholderTextColor="#FFF"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={this.onPress.bind(this)}>
                    <View style={styles.signin}>
                        <Text style={styles.whiteFont}>{I18n.t('register')}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={styles.greyFont}>{I18n.t('already_account')}</Text>
                    <TouchableHighlight onPress={this.routeToLogin.bind(this)}>
                        <Text style={styles.whiteFont}>{I18n.t('login')}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    routeToLogin() {
        this.props.navigator.resetTo({
            title: "Login",
            screen: 'auth.LoginScreen'
        });
    }

    onPress() {
        this.props.register(this.state.email, this.state.password);
    }
}


export default connect(
    (state) => ({
        auth: state.auth
    }),
    (dispatch) => ({
        ...bindActionCreators(authActions, dispatch)
    })
)(Register);
