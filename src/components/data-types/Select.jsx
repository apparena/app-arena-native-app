import React from 'react';
import Component from '../../framework/component'
import Select from 'react-select';

export default class SelectElementComponent extends Component {
    render() {
        return (
            <div className="input-group">
                <Select
                    name="form-field-name"
                    id={this.props.id}
                    value={this.props.defaultValue}
                    options={this.props.options}
                    onChange={this.props.handleChange}
                    multi={this.props.multi}
                    clearable={this.props.clearable}
                    autoBlur={true}
                    clearAllText={"Test"}
                    clearValueText={"Test"}
                    placeholder={"Auswählen"}
                    searchingText={"Suchen..."}
                    noResultsText={"Keine Ergebnisse"}
                    disabled={this.props.disabled}
                />
            </div>
        );
    }
}