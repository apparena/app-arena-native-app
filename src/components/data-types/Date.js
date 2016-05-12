import React, {PropTypes} from "react";
import Component from "../../framework/component";
import {View, DatePickerIOS} from "react-native";
import moment from "moment";

export default class TextElementComponent extends Component {
    static propTypes = {
        setValue: PropTypes.func.isRequired,
        value: PropTypes.string
    };

    getInitState() {
        var multiline = (this.props.value.length >= 35);
        return ({
            multiline
        });
    }

    onChange(value) {
        value = moment(value).format('YYYY-MM-DD hh:mm:ss');
        this.props.setValue(value)
    }

    render() {
        var date = new Date(this.props.value);
        return (
            <View style={{backgroundColor: '#fff'}}>
                <View style={{margin: 15}}>
                    <DatePickerIOS
                        date={date}
                        mode="datetime"
                        onDateChange={this.onChange.bind(this)}
                    />
                </View>
            </View>
        )
    }
}