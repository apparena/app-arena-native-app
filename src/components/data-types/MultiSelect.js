import React from "react";
import Component from "../../framework/component";
import {Text, Picker, View, StyleSheet, Switch, ScrollView} from "react-native";
import {generalStyles} from "../../framework/general";

export default class SelectElementComponent extends Component {
    onChange(value) {
        var multiValue = JSON.parse(this.props.value);
        if (multiValue.indexOf(value) !== -1) {
            multiValue.splice(multiValue.indexOf(value), 1);
        } else {
            multiValue.push(value);
        }
        this.props.setValue(JSON.stringify(multiValue));
    }

    render() {
        var state = {};
        var value = JSON.parse(this.props.value);
        this.props.config.meta.options.map(function (option) {
            state[option.value] = (value.indexOf(option.value) !== -1);
        });
        return (
            <ScrollView>
                {this.props.config.meta.options.map((option) => (
                    <View key={option.value}>
                        <View style={styles.row}>
                            <View style={styles.firstCheckbox}>
                                <Text style={styles.rowText}>
                                    {option.text}
                                </Text>
                            </View>
                            <View style={styles.secondCheckbox}>
                                <Switch
                                    {...this.props}
                                    value={state[option.value]}
                                    onValueChange={this.onChange.bind(this, option.value)}/>
                            </View>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                ))}
            </ScrollView>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({}));