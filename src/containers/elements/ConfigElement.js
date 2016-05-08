import * as configActions from "../../actions/config";
import React from "react";
import {Text, Image, View, ScrollView, TouchableOpacity, StyleSheet, Alert} from "react-native";
import Component from "../../framework/component";
import {generalStyles} from "../../framework/general";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

//Import ConfigElements Screens
import TextScreen from "../../components/data-types/Text";
import ImageScreen from "../../components/data-types/Image";

// this is a traditional React component connected to the redux store
class ConfigElement extends Component {
    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Speichern', // for a textual button, provide the button title (label)
                id: 'save', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                disabled: false // optional, used to disable the button (appears faded and doesn't interact)
            }
        ]
    };

    constructor(props, children) {
        super(props, children);
        this.state = this.getInitState ? this.getInitState() : {};
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    getInitState() {
        return ({
            user: {}
        });
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'save') { // this is the same id field from the static navigatorButtons definition
                this.props.logout();
            }
        }
    }

    render() {
        var config = this.props.data;
        return (
            <View style={styles.page}>
                <Text style={styles.name}>
                    {this.props.data.name.toUpperCase()}
                </Text>
                {(() => {
                    switch (config.type) {
                        case "color":
                            return <ColorScreen {...this.props}/>;
                        case "input":
                            return <TextScreen {...this.props}/>;
                        case "html":
                            return <HtmlScreen {...this.props}/>;
                        case "css":
                            return <CssScreen {...this.props}/>;
                        case "image":
                            return <ImageScreen {...this.props}/>;
                        case "checkbox":
                            return <CheckboxScreen {...this.props}/>;
                        case "select":
                            return <SelectScreen {...this.props}/>;
                        case "multiselect":
                            return (
                                <MultiselectScreen {...this.props}/>
                            );
                        case "date":
                            return <Date {...this.props}/>;
                        case undefined:
                            break;
                        default:
                            console.warn("Cannot render unknown type '" + config.type + "' of configElement", config);
                    }
                })()}
                {this._renderDescription()}
            </View>
        )
    }


    _renderDescription() {
        if (this.props.data.description) {
            return (
                <Text style={styles.description}>
                    {this.props.data.description}
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
        config: state.config
    }),
    (dispatch) => ({
        ...bindActionCreators(configActions, dispatch)
    })
)(ConfigElement);
