import React, {PropTypes} from "react";
import Component from "../../framework/component";
import {View, TextInput} from "react-native";
import I18n from "react-native-i18n";
import {validColor} from '../../helpers/validate'

export default class Color extends Component {
    static propTypes = {
        setValue: PropTypes.func.isRequired,
        value: PropTypes.string
    };

    onChange(value) {
        this.props.setValue(value)
    }

    render() {
        var backgroundColor = (validColor(this.props.value)) ? this.props.value : '#fff';
        return (
            <View style={{backgroundColor: '#fff', flexDirection: 'row'}}>
                <View style={{backgroundColor, flex: .2}}>
                </View>
                <View style={{margin: 15, flex: .8}}>
                    <TextInput
                        style={{height: 40}}
                        onChangeText={this.onChange.bind(this)}
                        value={this.props.value}
                        autoCorrect={true}
                        autoFocus={true}
                        keyboardType={'default'}
                        placeholderTextColor={I18n.t('input_placeholder')}
                        clearButtonMode={"while-editing"}
                        returnKeyType={'done'}
                    />
                </View>
            </View>
        )
    }
}