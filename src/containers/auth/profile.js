import * as authActions from "../../actions/auth";
import * as userActions from "../../actions/user";
import React from "react";
import {Text, Image, View, TouchableOpacity, StyleSheet, ActionSheetIOS} from "react-native";
import Component from "../../framework/component";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import I18n from "react-native-i18n";


// this is a traditional React component connected to the redux store
class Profile extends Component {
    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Logout', // for a textual button, provide the button title (label)
                id: 'logout', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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
            renderPlaceholderOnly: true,
            user: {}
        });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getCurrentUser(2, this.props.auth.userId);
        }
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.user !== nextProps.user
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                renderPlaceholderOnly: false,
                user: nextProps.user[2]
            })
        }
    }


    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'logout') { // this is the same id field from the static navigatorButtons definition
                this.props.logout();
            }
        }
    }

    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: [
                    I18n.t('change_avatar'),
                    I18n.t('delete'),
                    I18n.t('cancel')
                ],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 1
            },
            (buttonIndex) => {
                this.setState({clicked: buttonIndex});
            });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        return (
            <View style={styles.page}>
                <View style={styles.avatarBg}>
                    <View style={styles.avatar}>
                        <TouchableOpacity onPress={this.showActionSheet.bind(this)}>
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

                </View>
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View>
                <Text>Loading...</Text>
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
    infoBg: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
)(Profile);
