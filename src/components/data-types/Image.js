import React from "react";
import reactNative from "react-native";
import Component from "../../framework/component";
const {View, Image, TouchableOpacity, Platform, NativeModules: {ImagePickerManager}} = reactNative;
import I18n from "react-native-i18n";
import {uploadCompanyMediaAction} from '../../helpers/requests'


export default class ImageScreen extends Component {
    selectPhotoTapped() {
        let self = this;
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
                var fileURL;
                if (Platform.OS === 'android') {
                    fileURL = response.uri
                } else {
                    fileURL = response.uri.replace('file://', '')
                }
                let data = new FormData();
                if (fileURL) {
                    data.append('image', {uri: fileURL, name: self.props.configId + '.jpg', type: 'image/jpg'})
                }
                uploadCompanyMediaAction(self.props.auth.companyId, data)
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.status == "201") {
                            this.props.setValue(result.files[0].uri)
                        }
                    })
                    .catch((error) => {
                        console.warn(error);
                    });
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
