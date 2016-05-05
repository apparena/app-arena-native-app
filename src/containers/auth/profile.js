import * as authActions from "../../actions/auth";
import * as userActions from "../../actions/user";
import React, {Text, Image, View, ScrollView, TouchableOpacity, StyleSheet, Alert} from "react-native";
import Component from "../../framework/component";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


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
    constructor (props, children) {
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

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        return (
            <View style={styles.page}>
                <Text>
                    {this.state.user.firstName}
                </Text>
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
