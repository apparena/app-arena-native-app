/* @flow */
/*eslint-disable prefer-const */
import * as appsActions from "../../actions/apps";
import React, {StyleSheet, Text, ListView, View} from "react-native";
import Component from "../../framework/component";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import AppListItem from "../../components/AppListItem";

class AppList extends Component {
    getInitState() {
        return ({
            loading: true,
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
                loading: false
            })
        }
    }

    renderRow(rowData) {
        return (
            <AppListItem {...this.props} rowData={rowData}/>
        );
    }

    render() {
        if (this.state.loading) {
            return this._renderPlaceholderView()
        } else {
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

    _renderPlaceholderView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading Apps...
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    page: {
        flex: 1
    }
});

export default connect(
    (state) => ({
        auth: state.auth,
        apps: state.apps
    }),
    (dispatch) => ({
        ...bindActionCreators(appsActions, dispatch)
    })
)(AppList);
