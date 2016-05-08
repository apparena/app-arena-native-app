import React from 'react';
import Component from '../../framework/component'
import Toggle from 'react-toggle'

export default class CheckboxComponent extends Component {
    render() {
        var id = this.props.identifier.replace("_", "");
        return (
            <Toggle
                id={id}
                defaultChecked={this.props.checked}
                onChange={this.props.onChange}
            />
        )
    }
}