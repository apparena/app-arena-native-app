import React from "react";
import {View, Image, TouchableOpacity, ActionSheetIOS} from "react-native";
import Component from "../../framework/component";
import I18n from "react-native-i18n";

export default class ImageScreen extends Component {
    getInitState() {
        return ({
            value: this.props.data.value
        })
    }

    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: [
                    I18n.t('change_image'),
                    I18n.t('delete'),
                    I18n.t('cancel')
                ],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 1
            },
            (buttonIndex) => {
                this.setState({clicked: buttonIndex});
            });
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.showActionSheet.bind(this)}>
                    <Image
                        resizeMode="contain"
                        style={{flex:1, height: 250, backgroundColor: '#fff'}}
                        source={{uri: this.state.value}}/>
                </TouchableOpacity>
            </View>
        );
    }

}
