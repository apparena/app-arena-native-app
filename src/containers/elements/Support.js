import * as authActions from "../../actions/auth";
import * as userActions from "../../actions/user";
import React from "react";
import {Text, Image, View, ScrollView, TouchableHighlight, StyleSheet, WebView} from "react-native";
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
            <ScrollView style={styles.page}>
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
                        App-Arena
                    </Text>
                </View>
                <View style={styles.infoBg}>
                    <View style={styles.infoText}>
                        <Text>{I18n.t('service_info_text')}</Text>
                    </View>
                    <TouchableHighlight onPress={() => Communications.phonecall('02212920440', true)}>
                        <View style={styles.row}>
                            <View style={styles.first}>
                                <Text style={styles.rowText}>
                                    {I18n.t('phone_call')}
                                </Text>
                            </View>
                            <View style={styles.second}>
                                <Icon name="phone" size={25} color="#ccc"/>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.separator}/>
                    <TouchableHighlight onPress={() => Communications.email(['service@app-arena.com'],null,null,null,null)}>
                        <View style={styles.row}>
                            <View style={styles.first}>
                                <Text style={styles.rowText}>
                                    {I18n.t('send_email')}
                                </Text>
                            </View>
                            <View style={styles.second}>
                                <Icon name="envelope" size={25} color="#ccc"/>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
    infoText: {
        margin: 30
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
        fontSize: 20,
        textAlign: 'right',
        color: '#fff',
        fontWeight: '500'
    },
    first: {
        flex: .90,
        justifyContent: 'center'
    },
    second: {
        flex: .10
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
