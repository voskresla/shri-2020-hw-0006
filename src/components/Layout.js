import React, { Component } from "react";
import "./Layout.css";

export default class Layout extends Component {
  render() {
    return (
      <div className="layout layout_v-ratio_1-full-1">
        {this.props.children}
      </div>
    );
  }
}
