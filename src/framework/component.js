import React from "react-native";

export default class BaseComponent extends React.Component {
    constructor (props, children) {
        super(props, children);
        this.state = this.getInitState ? this.getInitState() : {};
    }

}