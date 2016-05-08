import * as appActions from "../../actions/app";
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
    TouchableHighlight,
    AsyncStorage
} from "react-native";
import Component from "../../framework/component";
import I18n from "react-native-i18n";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    redBackground: {
        backgroundColor: 'red'
    },
    greyFont: {
        color: '#D8D8D8'
    },
    whiteFont: {
        color: '#FFF'
    }
});

class Login extends Component {
    getInitState() {
        return ({
            email: 'test@app-arena.com',
            password: '1234',
            errorMessage: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.status === 200) {
            AsyncStorage.setItem('token', nextProps.auth.token);
            this.props.changeAppRoot('after-login');
        } else {
            var error_msg = I18n.t('login_error');
            if (nextProps.auth.statusText.indexOf("User") !== -1) {
                error_msg = I18n.t('user_not_exist');
            }
            if (nextProps.auth.statusText.indexOf("Password") !== -1) {
                error_msg = I18n.t('wrong_password');
            }
            this.setState({
                errorMessage: error_msg
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.mark} source={require('../../../assets/img/apparena.png')}/>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.errorContainer}>
                        <Text style={styles.whiteFont}>{this.state.errorMessage}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputUsername} name="user" size={22} color="#fff"/>
                        <TextInput
                            ref="email"
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t('email')}
                            placeholderTextColor="#FFF"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({email: text, errorMessage: ''})}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={(event) => {this.refs.password.focus()}}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputPassword} name="lock" size={22} color="#fff"/>
                        <TextInput
                            ref="password"
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t('password')}
                            placeholderTextColor="#FFF"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text, errorMessage: ''})}
                            returnKeyType="next"
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={this.onPress.bind(this)}>
                    <View style={styles.signin}>
                        <Text style={styles.whiteFont}>{I18n.t('login')}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={styles.greyFont}>{I18n.t('need_account')}</Text>
                    <TouchableHighlight onPress={this.routeToSignup.bind(this)}>
                        <Text style={styles.whiteFont}>{I18n.t('register')}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    routeToSignup() {
        this.props.navigator.resetTo({
            title: "Register",
            screen: "auth.RegisterScreen"
        });
    }

    onPress() {
        if (this.state.email && this.state.password) {
            this.props.login(this.state.email, this.state.password);
        } else if (this.state.email) {
            this.refs.password.focus();
            this.setState({
                errorMessage: I18n.t('no_password')
            })
        } else {
            this.refs.email.focus();
            this.setState({
                errorMessage: I18n.t('no_email')
            })
        }
    }
}


export default connect(
    (state) => ({
        auth: state.auth
    }),
    (dispatch) => ({
        ...bindActionCreators(appActions, dispatch),
        ...bindActionCreators(authActions, dispatch)
    })
)(Login);
