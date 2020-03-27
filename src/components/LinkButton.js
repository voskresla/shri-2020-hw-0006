import React, { Component } from "react";
import Button from "./Button";
import { history } from "../utils/index";

import "./Button.css";

export default class LinkButton extends Component {
  handleClick = () => {
    history.push(this.props.href);
  };

  render() {
    return <Button {...this.props} handleClick={this.handleClick} />;
  }
}
