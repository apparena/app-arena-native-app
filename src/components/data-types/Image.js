import React from "react";
import reactNative from "react-native";
import Component from "../../framework/component";
const {View, Image, TouchableOpacity, Platform, NativeModules: {ImagePickerManager}} = reactNative;
import I18n from "react-native-i18n";


export default class ImageScreen extends Component {
    selectPhotoTapped() {
        const options = {
            title: I18n.t('image_picker'),
            takePhotoButtonTitle: I18n.t('take_image'),
            chooseFromLibraryButtonTitle: I18n.t('choose_image'),
            cancelButtonTitle:  I18n.t('cancel'),
            storageOptions: {
                skipBackup: true,
                path: 'App-Arena'
            },
            noData: true,
            allowsEditing: true
        };

        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either:
                //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                var uri;
                if (Platform.OS === 'android') {
                    uri = response.uri
                } else {
                    uri = response.uri.replace('file://', '')
                }
                this.props.uploadCompanyMedia(this.props.auth.companyId, {
                    filename: 'file', // this is what your server is looking for
                    filepath: uri, // uri from response (local path of image on device)
                    filetype: 'image/jpeg'
                });
                this.props.setValue(uri)
            }
        });
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <Image
                        resizeMode="contain"
                        style={{flex:1, height: 250, backgroundColor: '#fff'}}
                        source={{uri: this.props.value}}/>
                </TouchableOpacity>
            </View>
        );
    }

}
