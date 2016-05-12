import React from "react";
import Component from "../../framework/component";
import {Picker, View, StyleSheet} from "react-native";

export default class SelectElementComponent extends Component {

    onChange(value) {
        this.props.setValue(value)
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff'}}>
                <View style={{margin: 15}}>
                    <Picker
                        selectedValue={this.props.value}
                        onValueChange={this.onChange.bind(this)}>
                        {this.props.config.meta.options.map((option) => (
                            <Picker.Item
                                key={option.value}
                                value={option.value}
                                label={option.text}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        );
    }
}