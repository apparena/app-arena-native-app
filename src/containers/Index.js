import {Navigation} from "react-native-navigation";
import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";
import ProfileScreen from "./auth/profile";
import NewsScreen from "../containers/lists/News";
import AppsList from "../containers/lists/App";
import StepsList from "../containers/lists/Steps";
import StepList from "../containers/lists/Step";

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('auth.LoginScreen', () => LoginScreen, store, Provider);
    Navigation.registerComponent('auth.RegisterScreen', () => RegisterScreen, store, Provider);
    Navigation.registerComponent('auth.ProfileScreen', () => ProfileScreen, store, Provider);
    Navigation.registerComponent('lists.News', () => NewsScreen, store, Provider);
    Navigation.registerComponent('lists.Apps', () => AppsList, store, Provider);
    Navigation.registerComponent('lists.Steps', () => StepsList, store, Provider);
    Navigation.registerComponent('lists.Step', () => StepList, store, Provider);
}
