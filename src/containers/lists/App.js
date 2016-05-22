/* @flow */
/*eslint-disable prefer-const */
import * as appsActions from "../../actions/apps";
import React from "react";
import {StyleSheet, Text, ListView, View, RefreshControl} from "react-native";
import Component from "../../framework/component";
import {generalStyles, renderPlaceholderView, renderNoItemsView} from "../../framework/general";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import AppListItem from "../../components/lists/listItems/AppListItem";
import I18n from "react-native-i18n";

class AppList extends Component {
    getInitState() {
        return ({
            loading: true,
            refreshing: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        })
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getUsersApps(this.props.auth.token, {fields: 'name'});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.apps !== nextProps.apps ||
            this.state.renderPlaceholderOnly !== nextState.renderPlaceholderOnly ||
            this.state.dataSource !== nextState.dataSource
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.apps) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.apps),
                loading: false,
                refreshing: false
            })
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.props.getUsersApps(this.props.auth.token, {fields: 'name'});
    }

    renderRow(rowData) {
        return (
            <AppListItem {...this.props} rowData={rowData}/>
        );
    }

    render() {
        if (this.state.loading) {
            return renderPlaceholderView()
        } else {
            if (this.state.dataSource.getRowCount()) {
                return (
                    <View style={styles.page}>
                        <ListView
                            refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                          />
                        }
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                        />
                    </View>
                );
            } else {
                return renderNoItemsView(I18n.t('no_apps_availible'));
            }
        }
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({}));

export default connect(
    (state) => ({
        auth: state.auth,
        apps: state.apps
    }),
    (dispatch) => ({
        ...bindActionCreators(appsActions, dispatch)
    })
)(AppList);
