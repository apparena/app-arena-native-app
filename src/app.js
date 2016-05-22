import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {Navigation} from "react-native-navigation";
import * as appActions from "./actions/app";
import configureStore from "./helpers/configure-store";
import {registerScreens} from "./containers/index";
import {registerTranslation} from "./i18n/translations";

const state = window.__initialState;
const store = configureStore(state);

// screen related book keeping
registerScreens(store, Provider);
//Init Language-Translation
registerTranslation();

// notice that this is just a simple class, it's not a React component
export default class App {
    constructor() {
        // since react-redux only works on components, we need to subscribe this class manually
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());
    }

    onStoreUpdate() {
        let {root} = store.getState().app;
        const {icons} = store.getState().icons;
        const {isAuthenticated} = store.getState().auth;
        const isConnected = store.getState().netInfo;
        if (!isAuthenticated && root != "register") {
            root = "login";
        }
        if (!isConnected) {
            root = "notConnected";
        }
        if (this.currentRoot != root && root) {
            this.currentRoot = root;
            this.startApp(root, icons);
        }
    }

    startApp(root, icons) {
        switch (root) {
            case 'notConnected':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'elements.NoConnection',
                        title: 'Login',
                        navigatorStyle: {
                            navBarHidden: true,
                            statusBarTextColorScheme: 'light'
                        }
                    }
                });
                return;
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
                        screen: 'auth.RegisterScreen',
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
                            icon: icons.world,
                            selectedIcon: icons.world_selected,
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
                            icon: icons.list,
                            selectedIcon: icons.list_selected,
                            title: 'Apps',
                            navigatorStyle: {
                                drawUnderNavBar: true,
                                navBarTextColor: '#ffffff',
                                navBarBackgroundColor: '#2D343D',
                                statusBarTextColorScheme: 'light'
                            }
                        },
                        {
                            label: 'Support',
                            screen: 'elements.SupportScreen',
                            icon: icons.chatboxes,
                            selectedIcon: icons.chatboxes_selected,
                            title: 'Support',
                            navigatorStyle: {
                                drawUnderNavBar: true,
                                navBarTextColor: '#ffffff',
                                navBarBackgroundColor: '#2D343D',
                                statusBarTextColorScheme: 'light',
                                navBarNoBorder: true
                            }
                        },
                        {
                            label: 'User',
                            screen: 'auth.ProfileScreen',
                            icon: icons.person,
                            selectedIcon: icons.person_selected,
                            title: 'Profile',
                            navigatorStyle: {
                                navBarTextColor: '#ffffff',
                                navBarBackgroundColor: '#2D343D',
                                statusBarTextColorScheme: 'light',
                                navBarNoBorder: true
                            }
                        }
                    ],
                    animationType: 'slide-down',
                    title: 'App-Arena',
                    tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
                        tabBarButtonColor: '#2D343D'
                    }
                });
                return;
            default:
                console.error('Unknown app root');
        }
    }
}