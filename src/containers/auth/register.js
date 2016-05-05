import * as authActions from "../../actions/auth";
import React, {
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
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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
                        <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                        <TextInput
                            style={[styles.input, styles.whiteFont]}
                            placeholder="Username"
                            placeholderTextColor="#FFF"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                        <TextInput
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder="Pasword"
                            placeholderTextColor="#FFF"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                        <TextInput
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder="Pasword"
                            placeholderTextColor="#FFF"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={this.onPress.bind(this)}>
                    <View style={styles.signin}>
                        <Text style={styles.whiteFont}>Sign In</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={styles.greyFont}>Allready an Account? </Text>
                    <TouchableHighlight onPress={this.routeToLogin.bind(this)}>
                        <Text style={styles.whiteFont}> Login</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    routeToLogin() {
        this.props.navigator.resetTo({
            title: "Login",
            screen: 'auth.LoginScreen',
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
