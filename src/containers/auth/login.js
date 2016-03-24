import * as authActions from "../../actions/auth";
import React, {
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
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import app from "../App";
import register from "./register";

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
            email: 'v.klein@app-arena.com',
            password: '1234',
            errorMessage: ''
        });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.navigator.replace({
                title: "Home",
                component: app,
                navigationBarHidden: false,
                barStyle: "default"
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.status === 200) {
            AsyncStorage.setItem('token', nextProps.auth.token);
            this.props.navigator.replace({
                title: "Home",
                component: app,
                navigationBarHidden: false,
                barStyle: "default"
            });
        } else {
            this.setState({
                errorMessage: nextProps.auth.statusText
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
                        <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                        <TextInput
                            ref="email"
                            style={[styles.input, styles.whiteFont]}
                            placeholder="Email"
                            placeholderTextColor="#FFF"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({email: text, errorMessage: ''})}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={(event) => {this.refs.password.focus()}}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                        <TextInput
                            ref="password"
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder="Password"
                            placeholderTextColor="#FFF"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text, errorMessage: ''})}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.forgotContainer}>
                        <Text style={styles.greyFont}>Forgot Password</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={this.onPress.bind(this)}>
                    <View style={styles.signin}>
                        <Text style={styles.whiteFont}>Sign In</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={styles.greyFont}>Don't have an account? </Text>
                    <TouchableHighlight onPress={this.onSignupPress.bind(this)}>
                        <Text style={styles.whiteFont}> Sign Up</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    onSignupPress() {
        this.props.navigator.replace({
            title: "Register",
            component: register,
            navigationBarHidden: true,
            barStyle: "light-content"
        });
    }

    onPress() {
        if (this.state.email && this.state.password) {
            this.props.login(this.state.email, this.state.password);
        } else if (this.state.email) {
            this.refs.password.focus();
            this.setState({
                errorMessage: 'Please add a Password'
            })
        } else {
            this.refs.email.focus();
            this.setState({
                errorMessage: 'Please add a E-Mail'
            })
        }
    }
}


export default connect(
    (state) => ({
        auth: state.auth
    }),
    (dispatch) => ({
        ...bindActionCreators(authActions, dispatch)
    })
)(Login);
