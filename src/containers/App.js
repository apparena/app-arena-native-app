/* @flow */
/*eslint-disable prefer-const */

import React from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import jwtDecode from 'jwt-decode';

let {
    Text,
    ScrollView
} = React;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            userId: ''
        };
    }

    componentDidMount() {
        this.setState({
            token: this.props.auth.token,
            userId: this.props.auth.userId
        })
    }

    render() {
        return (
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
            >
                <Text>{this.state.token}</Text>
                <Text>{this.state.userId}</Text>
            </ScrollView>
        );
    }
}


export default connect(
    (state) => ({
        auth: state.auth
    }),
    (dispatch) => ({})
)(App);
