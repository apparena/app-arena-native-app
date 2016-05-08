import React from "react";
import Component from "../../framework/component";
import DatePicker from "react-datepicker";

require('react-datepicker/dist/react-datepicker.min.css');

export default class DateElementComponent extends Component {
    render() {
        return (
            <DatePicker
                dateFormat="DD.MM.YYYY"
                className="form-control"
                selected={this.props.startDate}
                onChange={::this.props.handleChange}
            />
        )
    }
}