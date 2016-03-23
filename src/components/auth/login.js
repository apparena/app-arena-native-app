import * as authActions from "../../actions/auth";
import React, {
    StyleSheet,
    Text,
    TextInput,
    View,
    WebView,
    Component,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";
import Dimensions from "Dimensions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import signup from "./register";
import app from "../../containers/App";

const windowSize = Dimensions.get('window');
var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#2D343D'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height,
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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'v.klein@app-arena.com',
            password: '1234',
            errorMessage: ''
        };
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.token) {
            this.props.navigator.push({title: "Home", component: app, navigationBar: true});
        }
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
        this.props.navigator.push({title: "Signup", component: signup});
    }

    onPress() {
        this.props.login(this.state.email, this.state.password);
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
