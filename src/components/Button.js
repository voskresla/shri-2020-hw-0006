import React, { Component } from "react";
import { cn } from "../utils/index";

import Icon from "./Icon";
import "./Button.css";

const className = cn("button");

export default class Button extends Component {
  render() {
    const iconName = false || this.props.iconName;
    const text = false || this.props.text;
    const hideMobile = this.props.hideMobile ? "decorator hide_mobile" : "";

    return (
      <button
        className={className(this.props.className)}
        onClick={this.props.handleClick}
      >
        {iconName && <Icon className={{ size: "s" }} name={iconName}></Icon>}
        {text && <div className={`button__text ${hideMobile}`}>{text}</div>}
      </button>
    );
  }
}
