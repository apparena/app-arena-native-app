import * as authActions from "../../actions/auth";
import * as userActions from "../../actions/user";
import * as mediaActions from "../../actions/media";
import React from "react";
import ReactNative from "react-native";
import Component from "../../framework/component";
import {uploadCompanyMediaAction} from "../../helpers/requests";
import {renderPlaceholderView, generalStyles} from "../../framework/general";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import I18n from "react-native-i18n";
import Icon from "react-native-vector-icons/FontAwesome";
const {Text, TextInput, Image, View, ScrollView, TouchableOpacity, StyleSheet, Platform, NativeModules: {ImagePickerManager}} = ReactNative;

// this is a traditional React component connected to the redux store
class Profile extends Component {
    constructor(props, children) {
        super(props, children);
        this.state = this.getInitState ? this.getInitState() : {};
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.navigator.setButtons({
            rightButtons: [
                {
                    title: I18n.t('logout'), // for a textual button, provide the button title (label)
                    id: 'logout', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                    disabled: false // optional, used to disable the button (appears faded and doesn't interact)
                }
            ]// see "Adding buttons to the navigator" below for format (optional)
        });
    }

    getInitState() {
        return ({
            renderPlaceholderOnly: true,
            user: {},
            avatar: ''
        });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getCurrentUser(this.props.auth.companyId, this.props.auth.userId);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.user !== nextProps.user ||
            this.state.user !== nextState.user
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                renderPlaceholderOnly: false,
                user: nextProps.user[this.props.auth.companyId]
            })
        }
    }

    updateUserData() {
        let data = this.state.user;
        this.props.updateCurrentUser(this.props.auth.companyId, this.props.auth.userId, data)
    }


    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'logout') { // this is the same id field from the static navigatorButtons definition
                this.props.logout();
            }
        }
    }

    selectPhotoTapped() {
        const self = this,
            options = {
                title: I18n.t('image_picker'),
                takePhotoButtonTitle: I18n.t('take_image'),
                chooseFromLibraryButtonTitle: I18n.t('choose_image'),
                cancelButtonTitle: I18n.t('cancel'),
                storageOptions: {
                    skipBackup: true,
                    path: 'App-Arena'
                },
                noData: false,
                allowsEditing: true
            };

        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either:
                //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                var fileURL;
                if (Platform.OS === 'android') {
                    fileURL = response.uri
                } else {
                    fileURL = response.uri.replace('file://', '')
                }
                let data = new FormData();
                if (fileURL) {
                    data.append('image', {uri: fileURL, name: 'image.jpg', type: 'image/jpg'})
                }
                var uploadObj = uploadCompanyMediaAction(self.props.auth.companyId, data);
                console.log(uploadObj);
            }
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return renderPlaceholderView();
        }

        return (
            <ScrollView style={styles.page}>
                <View style={styles.avatarBg}>
                    <View style={styles.avatar}>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <Image
                                resizeMode="cover"
                                style={styles.avatarImg}
                                source={{uri: (this.state.user.avatar) ? this.state.user.avatar : "https://secure.gravatar.com/avatar/default?d=mm"}}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.displayName}>
                        {this.state.user.displayname}
                    </Text>
                </View>
                <View style={styles.infoBg}>
                    <View style={styles.inputView}>
                        <Icon style={styles.icon} name="envelope" size={22} color="#2D343D"/>
                        <TextInput
                            style={styles.input}
                            ref="email"
                            placeholder={I18n.t("email")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.user.email}
                            onChangeText={(text) => this.setState(Object.assign({}, this.state.user, {email: text}))}
                            autoCorrect={true}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                        />
                    </View>
                    <View style={styles.separator}/>
                    <View style={styles.inputView}>
                        <Icon style={styles.icon} name="user" size={22} color="#2D343D"/>
                        <TextInput
                            style={styles.input}
                            ref="email"
                            placeholder={I18n.t("firstname")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.user.firstName}
                            onChangeText={(text) => this.setState(Object.assign({}, this.state.user, {firstName: text}))}
                            autoCorrect={true}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                        />
                    </View>
                    <View style={styles.separator}/>
                    <View style={styles.inputView}>
                        <Icon style={styles.icon} name="user" size={22} color="#2D343D"/>
                        <TextInput
                            style={styles.input}
                            ref="email"
                            placeholder={I18n.t("lastname")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.user.lastName}
                            onChangeText={(text) => this.setState(Object.assign({}, this.state.user, {lastName: text}))}
                            autoCorrect={true}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                        />
                    </View>
                    <View style={styles.separator}/>
                    <View style={styles.inputView}>
                        <Icon style={styles.icon} name="phone" size={22} color="#2D343D"/>
                        <TextInput
                            style={styles.input}
                            ref="email"
                            placeholder={I18n.t("telephone")}
                            placeholderTextColor="#5F5F5F"
                            value={this.state.user.telephone}
                            onChangeText={(text) => this.setState(Object.assign({}, this.state.user, {telephone: text}))}
                            autoCorrect={true}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                        />
                    </View>
                    <TouchableOpacity onPress={this.updateUserData.bind(this)}>
                        <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
                            <Text style={{margin: 30}}>Button</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
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
    },
    icon: {
        flex: 0.1,
        marginLeft: 15,
        width: 20,
        height: 20
    },
    avatarBg: {
        height: 150,
        backgroundColor: '#2D343D',
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        height: 40,
        padding: 10
    },
    infoBg: {
        flex: 1
    },
    avatar: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarImg: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    displayName: {
        flex: 0.3,
        fontSize: 16,
        textAlign: 'right',
        color: '#fff'
    },
    input: {
        flex: .9,
        height: 20,
        fontSize: 14
    }
}));


export default connect(
    (state) => ({
        auth: state.auth,
        user: state.user
    }),
    (dispatch) => ({
        ...bindActionCreators(authActions, dispatch),
        ...bindActionCreators(userActions, dispatch),
        ...bindActionCreators(mediaActions, dispatch)
    })
)(Profile);
