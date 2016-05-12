import * as configActions from "../../actions/config";
import * as mediaActions from "../../actions/media";
import React from "react";
import {Text, Image, View, ScrollView, TouchableOpacity, StyleSheet, Alert} from "react-native";
import Component from "../../framework/component";
import I18n from "react-native-i18n";
import {generalStyles} from "../../framework/general";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TextScreen from "../../components/data-types/Text";
import ImageScreen from "../../components/data-types/Image";
import ColorScreen from "../../components/data-types/Color";
import SelectScreen from "../../components/data-types/Select";
import MultiselectScreen from "../../components/data-types/MultiSelect";
import DateScreen from "../../components/data-types/Date";


// this is a traditional React component connected to the redux store
class ConfigElement extends Component {
    constructor(props, children) {
        super(props, children);
        this.state = this.getInitState ? this.getInitState() : {};
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    getInitState() {
        return ({
            value: this.props.config[this.props.configId].value
        });
    }

    setPropValue(value) {
        if (value !== this.props.config[this.props.configId].value) {
            this.props.navigator.setButtons({
                rightButtons: [
                    {
                        title: I18n.t('save'), // for a textual button, provide the button title (label)
                        id: 'save', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                        disabled: false // optional, used to disable the button (appears faded and doesn't interact)
                    }
                ]// see "Adding buttons to the navigator" below for format (optional)
            });
        } else {
            this.props.navigator.setButtons({
                rightButtons: [] // see "Adding buttons to the navigator" below for format (optional)
            });
        }
        this.setState({
            value
        })
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'save') {// this is the same id field from the static navigatorButtons definition
                var value = this.state.value;
                if (this.props.config[this.props.configId].type == "multiselect") {
                    value = JSON.parse(value);
                }
                this.props.updateConfigValue(this.props.appId, this.props.configId, value)
                    .then(() => {
                        this.props.navigator.pop();
                    })
                    .catch(() => {

                    });
            }
        }
    }

    render() {
        var config = this.props.config[this.props.configId];
        return (
            <View style={styles.page}>
                <Text style={styles.name}>
                    {config.name.toUpperCase()}
                </Text>
                {(() => {
                    switch (config.type) {
                        case "color":
                            return (
                                <ColorScreen value={this.state.value} setValue={this.setPropValue.bind(this)}/>
                            );
                        case "input":
                            return (
                                <TextScreen value={this.state.value} setValue={this.setPropValue.bind(this)}/>
                            );
                        case "html":
                            return (
                                <HtmlScreen value={this.state.value} setValue={this.setPropValue.bind(this)}/>
                            );
                        case "css":
                            return (
                                <CssScreen value={this.state.value} setValue={this.setPropValue.bind(this)}/>
                            );
                        case "image":
                            return (
                                <ImageScreen {...this.props} value={this.state.value} setValue={this.setPropValue.bind(this)}/>
                            );
                        case "select":
                            return (
                                <SelectScreen config={config} value={this.state.value} setValue={this.setPropValue.bind(this)}/>
                            );
                        case "multiselect":
                            return (
                                <MultiselectScreen config={config} value={this.state.value} setValue={this.setPropValue.bind(this)}/>
                            );
                        case "date":
                            return (
                                <DateScreen value={this.state.value} setValue={this.setPropValue.bind(this)}/>
                            );
                        case undefined:
                            break;
                        default:
                            console.warn("Cannot render unknown type '" + config.type + "' of configElement", config);
                    }
                })()}
                {this._renderDescription(config)}
            </View>
        )
    }


    _renderDescription(config) {
        if (config.description) {
            return (
                <Text style={styles.description}>
                    {config.description}
                </Text>
            )
        }
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
    description: {
        margin: 15,
        fontSize: 12,
        color: '#858585'
    },
    name: {
        margin: 15,
        marginBottom: 5,
        fontSize: 12,
        color: '#858585'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    }
}));


export default connect(
    (state) => ({
        auth: state.auth,
        appId: state.appId,
        config: state.config,
        media: state.media
    }),
    (dispatch) => ({
        ...bindActionCreators(configActions, dispatch),
        ...bindActionCreators(mediaActions, dispatch)
    })
)(ConfigElement);
