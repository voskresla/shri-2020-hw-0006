import React, { Component } from "react";
import "./RunBuild.css";
import { history } from "../utils/index";
import InputGroup from "./InputGroup";
import api from "../api/schoolciserver";
import Button from "./Button";

export default class RunBuild extends Component {
  state = {
    inputValue: ""
  };
  handleClose = e => {
    // console.log("from handler:", this.props.match.params[0]);
    e.preventDefault();

    history.goBack();
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputChange = (id, value) => {
    this.setState({ inputValue: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    // отправим коммит в билд
    const { data } = await api.post(`/builds/${this.state.inputValue}`);

    history.push(`/build/${data.data.buildNumber}`);
  };

  render() {
    console.log("props from run build:", this.props);
    return (
      <div className={this.props.match ? "modal" : ""}>
        <div className="modal__container">
          <div class='text text_type_h1 text_size_m'>
            New build
          </div>
          <div class='text text_type_h2 text_size_s'>
            Enter the commit hash wich you want to build
          </div>
          <div class="modal__input">
            <InputGroup
              // valid={!(this.state[item.id] !== "")}
              // id={item.id}
              inputValue={this.state.inputValue}
              handleChange={this.handleInputChange}
              // label={item.label}
              placeholder={"commit hash"}
              renderAppend={
                <Button
                  // handleClick={this.handleSubmit}
                  className={{ size: "m", distribute: "center" }}
                  iconName={"inputclose"}
                  
                />
              }
            />
          </div>
          <div class="modal__controls">
            <Button
              className={{
                size: "m",
                distribute: "center",
                view: "action"
              }}
              text="Run Build"
              handleClick={this.handleSubmit}
            />
            <Button
              className={{
                size: "m",
                distribute: "center",
                view: "control"
              }}
              text="Cancel"
              handleClick={this.handleClose}
            />
          </div>
        </div>
      </div>
    );
  }
}
