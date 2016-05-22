import * as authActions from "../../actions/auth";
import * as userActions from "../../actions/user";
import React from "react";
import {Text, Image, View, ScrollView, TouchableOpacity, StyleSheet, WebView} from "react-native";
import Component from "../../framework/component";
import {generalStyles} from "../../framework/general";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Communications from "react-native-communications";
import I18n from "react-native-i18n";
import Icon from "react-native-vector-icons/FontAwesome";

// this is a traditional React component connected to the redux store
class ConfigElement extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.avatarBg}>
                    <View style={styles.avatar}>
                        <View>
                            <Image
                                resizeMode="cover"
                                style={styles.avatarImg}
                                source={require('../../../assets/img/apparena.png')}/>
                        </View>
                    </View>
                    <Text style={styles.displayName}>
                        App-Arena GmbH
                    </Text>
                </View>
                <View style={styles.infoBg}>
                    <View style={styles.infoText}>
                        <Text>{I18n.t('service_info_text')}</Text>
                    </View>
                    <View style={styles.button}>
                        <Icon.Button name="phone" backgroundColor="#ACC825" onPress={() => Communications.phonecall('02212920440', true)}>
                            <Text style={{fontFamily: 'Arial', fontSize: 20, color: '#fff'}}>{I18n.t('phone_call')}</Text>
                        </Icon.Button>
                    </View>
                    <View style={styles.button}>
                        <Icon.Button name="envelope" backgroundColor="#ACC825" onPress={() => Communications.email(['service@app-arena.com'],null,null,null,null)}>
                            <Text style={{fontFamily: 'Arial', fontSize: 20, color: '#fff'}}>{I18n.t('send_email')}</Text>
                        </Icon.Button>
                    </View>
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
    icon: {
        flex: 0.1,
        marginLeft: 15,
        width: 20,
        height: 20
    },
    infoText: {
      marginBottom: 30
    },
    button: {
        marginBottom: 20
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
        padding: 30
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
        fontSize: 20,
        textAlign: 'right',
        color: '#fff',
        fontWeight: '500'
    }
}));


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
