import {Navigation} from "react-native-navigation";
import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";
import ProfileScreen from "./auth/profile";
import NewsScreen from "../containers/lists/News";
import AppsList from "../containers/lists/App";
import StepsList from "../containers/lists/Steps";
import StepList from "../containers/lists/Step";
import ConfigElement from "../containers/elements/ConfigElement";
import SupportScreen from "../containers/elements/Support";
import WebView from "../components/elements/WebView";
import HtmlView from "../components/elements/HtmlView";

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    //Auth
    Navigation.registerComponent('auth.LoginScreen', () => LoginScreen, store, Provider);
    Navigation.registerComponent('auth.RegisterScreen', () => RegisterScreen, store, Provider);
    Navigation.registerComponent('auth.ProfileScreen', () => ProfileScreen, store, Provider);
    //Lists
    Navigation.registerComponent('lists.News', () => NewsScreen, store, Provider);
    Navigation.registerComponent('lists.Apps', () => AppsList, store, Provider);
    Navigation.registerComponent('lists.Steps', () => StepsList, store, Provider);
    Navigation.registerComponent('lists.Step', () => StepList, store, Provider);
    //Elements
    Navigation.registerComponent('elements.ConfigElement', () => ConfigElement, store, Provider);
    Navigation.registerComponent('elements.SupportScreen', () => SupportScreen, store, Provider);
    Navigation.registerComponent('elements.WebView', () => WebView, store, Provider);
    Navigation.registerComponent('elements.HtmlView', () => HtmlView, store, Provider);
}
