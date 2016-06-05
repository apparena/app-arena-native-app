import * as wizardActions from "../../actions/wizard";
import * as appIdActions from "../../actions/appId";
import * as appInfoActions from "../../actions/appInfo";
import React from "react";
import {ListView, Text, View, StyleSheet, TabBarIOS, Touch, TouchableHighlight, InteractionManager} from "react-native";
import Component from "../../framework/component";
import {renderPlaceholderView, generalStyles} from "../../framework/general";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import WizardListItem from "../../components/lists/listItems/WizardListItem";
import I18n from "react-native-i18n";

class Wizard extends Component {
    getInitState() {
        return ({
            renderPlaceholderOnly: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        })
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'preview') { // this is the same id field from the static navigatorButtons definition
                let uri = this.props.appInfo.base_url.value + '?i_id=' + this.props.appId;
                this.props.navigator.push({
                    title: I18n.t('preview'),
                    screen: "elements.WebView",
                    passProps: {uri}
                });
            }
        }
    }

    componentDidMount() {
        if (this.props.wizard.appId === this.props.appId) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.wizard.wizardData.steps),
                renderPlaceholderOnly: false
            })
        } else if (this.props.auth.isAuthenticated) {
            this.props.initAppArenaWizard(this.props.appId, this.props.auth.token);
            this.props.getAppInfo(this.props.appId);
        }
        this.props.initAppId(this.props.appId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.wizard !== nextProps.wizard ||
            this.state.renderPlaceholderOnly !== nextState.renderPlaceholderOnly ||
            this.state.dataSource !== nextState.dataSource
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wizard.wizardData) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.wizard.wizardData.steps),
                renderPlaceholderOnly: false
            })
        }
        if (nextProps.appInfo.base_url && nextProps.appInfo.base_url.value) {
            this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
            this.props.navigator.setButtons({
                rightButtons: [
                    {
                        title: I18n.t('preview'), // for a textual button, provide the button title (label)
                        id: 'preview', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                        disabled: false // optional, used to disable the button (appears faded and doesn't interact)
                    }
                ] // see "Adding buttons to the navigator" below for format (optional)
            });
        }
    }

    renderRow(rowData) {
        if (rowData.type === "step") {
            return (
                <WizardListItem {...this.props} appId={this.props.appId} rowData={rowData}/>
            );
        } else {
            return (
                <View />
            )
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return renderPlaceholderView();
        }

        return (
            <View style={styles.page}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                />
            </View>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({}));

export default connect(
    (state) => ({
        auth: state.auth,
        wizard: state.wizard,
        app_id: state.appId,
        appInfo: state.appInfo
    }),
    (dispatch) => ({
        ...bindActionCreators(wizardActions, dispatch),
        ...bindActionCreators(appInfoActions, dispatch),
        ...bindActionCreators(appIdActions, dispatch)
    })
)(Wizard);
