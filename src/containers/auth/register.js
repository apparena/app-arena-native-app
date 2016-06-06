import * as authActions from "../../actions/auth";
import * as appActions from "../../actions/app";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
    WebView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
    Dimensions
} from "react-native";
import Component from "../../framework/component";
import I18n from "react-native-i18n";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Icon from "react-native-vector-icons/FontAwesome";


class Register extends Component {
    getInitState() {
        return ({
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            companyName: '',
            password: '',
            passwordConfirm: '',
            errorMessage: '',
            btn_loading: false
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            AsyncStorage.setItem('token', nextProps.auth.token);
            this.props.changeAppRoot('after-login');
            return;
        }
        if (nextProps.auth.status === 201) {
            if (nextProps.auth.authType == "company") {
                this.props.register(this.state.username, this.state.email, this.state.password, nextProps.auth.companyId, this.state.firstname, this.state.lastname)
            }
            if (nextProps.auth.authType == "user") {
                this.props.login(this.state.email, this.state.password)
            }
        } else {
            var error_msg = I18n.t('register_error');
            if (nextProps.auth.statusText.indexOf("User") !== -1) {
                error_msg = I18n.t('user_not_exist');
            }
            if (nextProps.auth.statusText.indexOf("Password") !== -1) {
                error_msg = I18n.t('wrong_password');
            }
            this.setState({
                errorMessage: error_msg,
                btn_loading: false
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image resizeMode="contain" style={styles.mark} source={require('../../../assets/img/apparena.png')}/>
                    <Text style={styles.brand}>App-Arena</Text>
                </View>
                <ScrollView scrollEnabled={(Dimensions.get('window').height < 667)} style={styles.inputs}>
                    <View style={styles.errorContainer}>
                        <Text style={styles.whiteFont}>{this.state.errorMessage}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputUsername} name="user" size={22} color="#fff"/>
                        <TextInput
                            ref="username"
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("username")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.username}
                            onChangeText={(text) => this.setState({username: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputUsername} name="user" size={22} color="#fff"/>
                        <TextInput
                            ref="firstname"
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("firstname")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.firstname}
                            onChangeText={(text) => this.setState({firstname: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputUsername} name="user" size={22} color="#fff"/>
                        <TextInput
                            ref="lastname"
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("lastname")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.lastname}
                            onChangeText={(text) => this.setState({lastname: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputUsername} name="envelope" size={22} color="#fff"/>
                        <TextInput
                            ref="email"
                            keyboard="email-address"
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("email")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputUsername} name="building" size={22} color="#fff"/>
                        <TextInput
                            ref="company"
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("company")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.companyName}
                            onChangeText={(text) => this.setState({companyName: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputPassword} name="lock" size={22} color="#fff"/>
                        <TextInput
                            ref="password"
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("password")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.inputPassword} name="lock" size={22} color="#fff"/>
                        <TextInput
                            ref="confirm_password"
                            password={true}
                            style={[styles.input, styles.whiteFont]}
                            placeholder={I18n.t("confirm_password")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.passwordConfirm}
                            onChangeText={(text) => this.setState({passwordConfirm: text})}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={this.onPress.bind(this)} disabled={this.state.btn_loading}>
                    <View style={styles.signin}>
                        <Text style={styles.whiteFont}>{I18n.t('register')}</Text>
                        {this._renderButtonLoading()}
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

    _renderButtonLoading() {
        if (this.state.btn_loading) {
            return (
                <ActivityIndicatorIOS
                    color="#fff"
                    animating={true}
                    size="small"
                />
            )
        }
    }

    routeToLogin() {
        this.props.changeAppRoot('login');
    }

    onPress() {
        if (this.state.email && this.state.companyName && this.state.password && this.state.passwordConfirm && this.state.password == this.state.passwordConfirm) {
            this.props.createCompany(this.state.companyName);
        } else if (!this.state.email) {
            this.refs.email.focus();
            this.setState({
                errorMessage: I18n.t('no_email')
            })
        } else if (!this.state.companyName) {
            this.refs.company.focus();
            this.setState({
                errorMessage: I18n.t('no_companyName')
            })
        } else if (!this.state.password) {
            this.refs.password.focus();
            this.setState({
                errorMessage: I18n.t('no_password')
            })
        } else if (!this.state.passwordConfirm) {
            this.refs.confirm_password.focus();
            this.setState({
                errorMessage: I18n.t('no_password')
            })
        } else if (this.state.password != this.state.passwordConfirm) {
            this.refs.confirm_password.focus();
            this.setState({
                errorMessage: I18n.t('passwords_not_equal')
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flexDirection: 'column',
        flex: .5,
        backgroundColor: '#2D343D'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .2,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 100,
        height: 100
    },
    brand: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
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
        flex: .45
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
        borderBottomColor: '#fff',
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

export default connect(
    (state) => ({
        auth: state.auth
    }),
    (dispatch) => ({
        ...bindActionCreators(appActions, dispatch),
        ...bindActionCreators(authActions, dispatch)
    })
)(Register);
