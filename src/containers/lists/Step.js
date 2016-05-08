import * as configActions from "../../actions/config";
import React from 'react';
import {ListView, Text, View, StyleSheet, Touch, InteractionManager} from "react-native";
import Component from "../../framework/component";
import {generalStyles} from "../../framework/general";
import {renderPlaceholderView} from "../../framework/general";
import I18n from 'react-native-i18n';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import StepListItem from "../../components/lists/listItems/StepListItem";

class Wizard extends Component {
    getInitState() {
        return ({
            renderPlaceholderOnly: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        })
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.initAppArenaConfig(this.props.appId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.config) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.rowData.elements),
                renderPlaceholderOnly: false
            })
        }
    }

    renderRow(rowData) {
        if (rowData.type === "configElement" && this.props.config[rowData.identifier]) {
            return (
                <StepListItem {...this.props} rowData={rowData}/>
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
                />
            </View>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({

}));

export default connect(
    (state) => ({
        auth: state.auth,
        config: state.config
    }),
    (dispatch) => ({
        ...bindActionCreators(configActions, dispatch)
    })
)(Wizard);
