/* @flow */
/*eslint-disable prefer-const */

import React, {Navigator, View, StatusBar} from "react-native";
import App from "./App";
import NavigationBar from "./../components/navigation-bar";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class Scene extends React.Component {
    renderScene(route:Object, navigator:Object) {
        const Component = route.component;
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle={route.barStyle}
                />
                {(!route.navigationBarHidden) &&
                <NavigationBar
                    backgroundStyle={{backgroundColor: "#eee"}}
                    navigator={navigator}
                    route={route}
                    title={route.title}
                    titleColor="#333"
                />
                }
                <Component
                    navigator={navigator}
                    route={route}
                    {...route.passProps}
                />
            </View>
        );
    }

    render() {
        return (
            <Navigator
                style={{flex: 1}}
                renderScene={this.renderScene}
                initialRoute={{
                      navigationBarHidden: false,
                      barStyle: 'default',
                      component: App,
                      title: "Starter App"
                    }}
            />
        );
    }
}

export default connect(
    (state) => ({
        auth: state.auth
    }),
    (dispatch) => ({})
)(Scene);
