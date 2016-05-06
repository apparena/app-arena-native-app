import {Component} from "react";

export default class BaseComponent extends Component {
    constructor(props, children) {
        super(props, children);
        this.state = this.getInitState ? this.getInitState() : {};
    }
}