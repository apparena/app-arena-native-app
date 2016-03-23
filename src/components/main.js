/* @flow */
/*eslint-disable prefer-const */

import React, {StatusBar, Navigator, View} from "react-native";
import Login from "../components/auth/login";
import NavigationBar from "./navigation-bar";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    renderScene(route:Object, navigator:Object) {
        console.log(route);
        const Component = route.component;
        return (
            <View style={{flex: 1}}>
                {(route.navigationBar) ?
                    <View>
                        <StatusBar
                            backgroundColor="red"
                            barStyle="default"
                        />
                        <NavigationBar
                            backgroundStyle={{backgroundColor: "#eee"}}
                            navigator={navigator}
                            route={route}
                            title={route.title}
                            titleColor="#333"
                        />
                    </View> :
                    <StatusBar
                        backgroundColor="red"
                        barStyle="light-content"
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
          component: Login,
          title: "Login",
          navigationBar: false
        }}
            />
        );
    }
}

export default Main;
