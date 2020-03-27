import React, { Component } from "react";
import { connect } from "react-redux";
import { saveSettings } from "../actions/index";
import Layout from "./Layout";
import LayoutContainer from "./LayoutContainer";
import Header from "./Header";
import Footer from "./Footer";
import InputGroup from "./InputGroup";
import Button from "./Button";

import api from "../api/schoolciserver";

import "./Settings.css";

const mapSettings = settings =>
  Object.keys(settings).map(key => {
    switch (key) {
      case "repoName":
        return {
          id: key,
          label: "Github repository",
          placeholder: settings[key]
        };
      case "buildCommand":
        return { id: key, label: "Build Command", placeholder: settings[key] };
      case "mainBranch":
        return { id: key, label: "Main Branch", placeholder: settings[key] };
      case "period":
        return {
          id: key,
          label: "Synchronize every",
          placeholder: settings[key]
        };
      default:
        return false;
    }
  });

class Settings extends Component {
  state = {};

  componentDidMount() {
    // this.props.loadSettings({
    //   repoName: "default xxx repoName",
    //   buildCommand: "default xxx build command",
    //   mainBranch: "default xxx main branch",
    //   period: 0
    // });
  }

  getSettings = async () => {
    const response = await api.get("/settings");

    this.setState({ settings: response.data });
  };

  handleInputChange = (id, value) => {
    this.setState({ [id]: value });
  };

  handleSubmit = e => {
    // e.preventDefault();
    this.props.saveSettings(this.state);
  };

  render() {
    return (
      <LayoutContainer className={{ size: "s", align: "center" }}>
        <div className="grid grid_m-columns_12 grid_col-gap_full grid grid_s-columns_12">
          <div className="grid__fraction grid__fraction_m-col_7">
            <form className="form">
              <div className="form__title">
                <div className="form__header text text_type_h2 text_size_m">
                  Settings
                </div>
                <div className="form__subheader text text_size_s text_view_ghost">
                  Configure repository connection and synchronization settings.
                </div>
              </div>
              <div className="form__items">
                {mapSettings(this.props.settings).map(item => (
                  <div className="form__item form__item_indent-b_xl">
                    <InputGroup
                      id={item.id}
                      inputValue={this.state[item.id]}
                      handleChange={this.handleInputChange}
                      label={item.label}
                      placeholder={item.placeholder}
                      renderAppend={
                        <Button
                          handleClick={this.handleSubmit}
                          className={{ size: "m", distribute: "center" }}
                          iconName={"inputclose"}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
              <div class="form__controls">
                <Button
                  className={{ size: "m", view: "action" }}
                  text="Save"
                  handleClick={this.handleSubmit}
                />
                <Button
                  className={{ size: "m", view: "control" }}
                  text="Cancel"
                />
              </div>
            </form>
          </div>
        </div>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return { settings: state.settings };
};

const mapDispatchToProps = { saveSettings };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
