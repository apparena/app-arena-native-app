import React from 'react-native';
var {
    StyleSheet,
    Image,
    Text,
    View,
    } = React;

var FBLogin = require('react-native-facebook-login');
var FBLoginMock = require('./facebook/FBLoginMock.js');
var FBLoginManager = require('NativeModules').FBLoginManager;

var FB_PHOTO_WIDTH = 200;

var Login = React.createClass({
    getInitialState: function () {
        return {
            user: null,
        };
    },

    render: function () {
        var _this = this;
        var user = this.state.user;

        return (
            <View style={styles.loginContainer}>

                { user && <Photo user={user}/> }
                { user && <Info user={user}/> }

                <FBLogin style={{ marginBottom: 10, }}
                         permissions={["email","user_friends","user_photos"]}
                         onLogin={function(data){
            console.log("Logged in!");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
                         onLogout={function(){
            console.log("Logged out.");
            _this.setState({ user : null });
          }}
                         onLoginFound={function(data){
            console.log("Existing login found.");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
                         onLoginNotFound={function(){
            console.log("No user logged in.");
            _this.setState({ user : null });
          }}
                         onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
                         onCancel={function(){
            console.log("User cancelled.");
          }}
                         onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }}
                    />

                <Text>{ user ? user.token : "N/A" }</Text>
            </View>
        );
    }
});

var Photo = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
            photo: null,
        };
    },

    componentWillMount: function () {
        var _this = this;
        var user = this.props.user;
        var api = `https://graph.facebook.com/v2.4/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

        fetch(api)
            .then((response) => response.json())
            .then((responseData) => {
                _this.setState({
                    photo: {
                        url: responseData.data.url,
                        height: responseData.data.height,
                        width: responseData.data.width
                    }
                });
            })
            .done();
    },

    render: function () {
        var photo = this.state.photo;
        console.log(photo && photo.url);
        return (
            <View style={styles.bottomBump}>

                <Image
                    style={photo &&
            {
              height: photo.height,
              width: photo.width,
            }
          }
                    source={{uri: photo && photo.url}}
                    />
            </View>
        );
    }
});

var Info = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
            info: null
        };
    },

    componentWillMount: function () {
        var _this = this;
        var user = this.props.user;
        var api = `https://graph.facebook.com/v2.4/${user.userId}?fields=name,email,photos&access_token=${user.token}`;
        fetch(api)
            .then((response) => response.json())
            .then((responseData) => {
                _this.setState({
                    info: {
                        name: responseData.name,
                        email: responseData.email,
                        photos: responseData.photos
                    },
                });
            })
            .done();
    },

    render: function () {
        var info = this.state.info;
        var user = (this.props.user) ? this.props.user : '';
        return (
            <View style={styles.bottomBump}>
                <Text>{ info && this.props.user.userId }</Text>
                <Text>{ info && info.name }</Text>
                <Text>{ info && info.email }</Text>
                <Image
                    style={styles.image}
                    source={{uri: "https://fbcdn-photos-d-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-0/s75x225/2574…38fb5237eb&oe=56928703&__gda__=1453292320_8b60b65c6fe9ce0c623ded378668d9a1"}}
                    />
                {info && info.photos.data.map((photo, index) => {
                    var api = `https://graph.facebook.com/v2.4/${photo.id}/picture?type=thumbnail&redirect=false&access_token=${user.token}`;
                    fetch(api)
                        .then((response) => response.json())
                        .then((responseData) => {
                            console.log(responseData.data.url);
                            return (
                                <Image
                                    style={
            {
              height: responseData.data.height,
              width: responseData.data.width,
            }
          }
                                    source={{uri: responseData.data.url}}
                                    />
                            )
                        })
                        .done();
                }, this)}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    loginContainer: {
        marginTop: 150,

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBump: {
        marginBottom: 15,
    },
    image: {
        height: 125,
        width: 125,
        borderRadius: 65,
        marginTop: 10,
        alignSelf: 'center'
    }
});

module.exports = Login;
