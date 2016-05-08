import React from 'react';
import Component from '../../framework/component'
import TinyMCE from 'react-tinymce';

export default class HtmlElementComponent extends Component {
    render() {
        return (
            <TinyMCE
                content={this.props.content}
                config={this.props.config}
                onChange={this.props.handleChange}
            />
        )
    }
}