import React from 'react';
import Component from '../../framework/component'
import Button from '../../containers/Button';
import ColorPicker from 'react-color';

export default class Color extends Component {
    render() {
        var color = {
            height: '24px',
            background: this.props.value
        };
        var swatch = {
            width: '200px',
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer'
        };
        var popupPosition = {
            position: 'absolute',
            top: '-10px',
            left: '30px'
        };
        var div = {
            position: 'relative'
        };
        return (
            <div style={div}>
                <div is="swatch" style={swatch} onClick={::this.props.handleClick}>
                    <div is="color" style={color}/>
                </div>
                <ColorPicker
                    type="sketch"
                    presetColors={this.props.presetColors}
                    color={ this.props.value }
                    positionCSS={popupPosition}
                    display={ this.props.displayColorPicker }
                    onChange={::this.props.handleChange }
                    onClose={::this.props.handleClose }
                />
            </div>
        );
    }

}