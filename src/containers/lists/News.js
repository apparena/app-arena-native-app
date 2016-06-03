/* @flow */
/*eslint-disable prefer-const */
import * as newsActions from "../../actions/news";
import React from "react";
import {StyleSheet, Text, ListView, View, WebView, RefreshControl} from "react-native";
import Component from "../../framework/component";
import {generalStyles, renderPlaceholderView, renderNoItemsView} from "../../framework/general";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import NewsListItem from "../../components/lists/listItems/NewsListItem";
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
                loading: false,
                refreshing: false
            })
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.props.getNews();
    }

    renderRow(rowData) {
        return (
            <NewsListItem {...this.props} rowData={rowData}/>
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
                            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                        />
                    </View>
                );
            } else {
                return renderNoItemsView(I18n.t('no_news_availible'));
            }
        }
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: '#eee',
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    }
}));

export default connect(
    (state) => ({
        auth: state.auth,
        news: state.news
    }),
    (dispatch) => ({
        ...bindActionCreators(newsActions, dispatch)
    })
)(AppList);
