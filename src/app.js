import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {Navigation} from "react-native-navigation";
import * as appActions from "./actions/app";
import configureStore from "./helpers/configure-store";
import {registerScreens} from "./containers/index";

const state = window.__initialState;
const store = configureStore(state);

// screen related book keeping
registerScreens(store, Provider);

// notice that this is just a simple class, it's not a React component
export default class App {
    constructor() {
        // since react-redux only works on components, we need to subscribe this class manually
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());
    }

    onStoreUpdate() {
        let {root} = store.getState().app;
        const {isAuthenticated} = store.getState().auth;
        if (!isAuthenticated) {
            root = "login";
        }

        // handle a root change
        // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
        if (this.currentRoot != root) {
            this.currentRoot = root;
            this.startApp(root);
        }
    }

    startApp(root) {
        switch (root) {
            case 'login':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'auth.LoginScreen',
                        title: 'Login',
                        navigatorStyle: {
                            navBarHidden: true,
                            statusBarTextColorScheme: 'light'
                        }
                    }
                });
                return;
            case 'register':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'example.LoginScreen',
                        title: 'Anmelden',
                        navigatorStyle: {
                            navBarHidden: true,
                            statusBarTextColorScheme: 'light'
                        }
                    }
                });
                return;
            case 'after-login':
                Navigation.startTabBasedApp({
                    tabs: [
                        {
                            label: 'News',
                            screen: 'lists.News',
                            icon: require('../assets/img/one.png'),
                            selectedIcon: require('../assets/img/one_selected.png'),
                            title: 'News',
                            navigatorStyle: {
                                drawUnderNavBar: true,
                                navBarTextColor: '#ffffff',
                                navBarBackgroundColor: '#2D343D',
                                statusBarTextColorScheme: 'light'
                            }
                        },
                        {
                            label: 'Apps',
                            screen: 'lists.Apps',
                            icon: require('../assets/img/two.png'),
                            selectedIcon: require('../assets/img/two_selected.png'),
                            title: 'Apps',
                            navigatorStyle: {
                                drawUnderNavBar: true,
                                navBarTextColor: '#ffffff',
                                navBarBackgroundColor: '#2D343D',
                                statusBarTextColorScheme: 'light'
                            }
                        },
                        {
                            label: 'User',
                            screen: 'auth.ProfileScreen',
                            icon: require('../assets/img/two.png'),
                            selectedIcon: require('../assets/img/two_selected.png'),
                            title: 'Profile',
                            navigatorStyle: {
                                drawUnderNavBar: true,
                                navBarTextColor: '#ffffff',
                                navBarBackgroundColor: '#2D343D',
                                statusBarTextColorScheme: 'light'
                            }
                        }
                    ],
                    animationType: 'slide-down',
                    title: 'App-Arena'
                });
                return;
            default:
                console.error('Unknown app root');
        }
    }
}