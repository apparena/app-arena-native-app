import React, {PropTypes} from "react";
import Component from "../../framework/component";
import {View, TextInput} from "react-native";
import I18n from "react-native-i18n";

export default class TextElementComponent extends Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        defaultValue: PropTypes.string,
        id: PropTypes.string
    };

    getInitState() {
        return ({
            value: this.props.data.value
        })
    }

    onChange(value) {
        this.setState({
            value
        });
        //this.props.handleChange()
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff'}}>
                <View style={{margin: 15}}>
                    <TextInput
                        style={{height: 40}}
                        onChangeText={this.onChange.bind(this)}
                        value={this.state.value}
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