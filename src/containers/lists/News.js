/* @flow */
/*eslint-disable prefer-const */
import * as newsActions from "../../actions/news";
import React, {StyleSheet, Text, ListView, View, WebView} from "react-native";
import Component from "../../framework/component";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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
            this.props.getNews();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.news !== nextProps.news ||
            this.state.renderPlaceholderOnly !== nextState.renderPlaceholderOnly ||
            this.state.dataSource !== nextState.dataSource
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.news) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.news),
                loading: false
            })
        }
    }

    renderRow(rowData) {
        return (
            <WebView
                source={{uri: rowData.link}}
            />
        );
    }

    render() {
        if (this.state.loading) {
            return this._renderPlaceholderView()
        } else {
            return (
                <View style={styles.page}>
                </View>
            );
        }
    }

    _renderPlaceholderView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading News...
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
        news: state.news
    }),
    (dispatch) => ({
        ...bindActionCreators(newsActions, dispatch)
    })
)(AppList);
