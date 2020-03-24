import React, { Component } from "react";
import { classNames } from "../utils/index";
import "./Icon.css";

export default class Icon extends Component {
  render() {
    return <div className={classNames(this.props)}>{this.props.children}</div>;
  }
}
