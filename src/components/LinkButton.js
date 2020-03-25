import React, { Component } from "react";
import Button from "./Button";
import { history } from "../utils/index";

import "./Button.css";

export default class LinkButton extends Component {
  handleClick = () => {
    console.log("sdsdsd");
    history.push(this.props.href);
  };

  render() {
    console.log("asdasd");
    return <Button {...this.props} onClick={this.handleClick} />;
  }
}
