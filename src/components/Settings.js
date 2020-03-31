import React, { Component } from "react";
import { connect } from "react-redux";
import {
  saveSettings,
  getSettingsFromYNDX,
  saveSettingsYndx
} from "../actions/index";
import Layout from "./Layout";
import LayoutContainer from "./LayoutContainer";
import Header from "./Header";
import Footer from "./Footer";
import InputGroup from "./InputGroup";
import Button from "./Button";
import { history } from "../utils/index";

import "./Settings.css";

const placeholders = {
  repoName: "default placeholder",
  buildCommand: "default build command",
  mainBranch: "default MainBranch",
  period: "0"
};

const mapSettings = settings => {
  const tmp = Object.keys(settings)
    .filter(key => key !== "id")
    .map(key => {
      switch (key) {
        case "repoName":
          return {
            id: key,
            label: "Github repository",
            placeholder: placeholders[key]
          };
        case "buildCommand":
          return {
            id: key,
            label: "Build Command",
            placeholder: placeholders[key]
          };
        case "mainBranch":
          return {
            id: key,
            label: "Main Branch",
            placeholder: placeholders[key]
          };
        case "period":
          return {
            id: key,
            label: "Synchronize every",
            placeholder: placeholders[key]
          };
        default:
          break;
      }
    });

  return tmp;
};

const isSettingsCached = settings =>
  Object.keys(settings).every(key => settings[key] !== "");

const isEqualSimple = (prev, next) => {
  return (
    prev.buildCommand === next.buildCommand ||
    prev.repoName === next.repoName ||
    prev.mainBranch === next.mainBranch ||
    prev.period === next.period
  );
};

class Settings extends Component {
  // значения для inputs беруться из redux
  // потом они синхронизируються с внутренним стейт для контроля
  // потом снова беруться из редакс
  state = {
    repoName: "",
    buildCommand: "",
    mainBranch: "",
    period: "",
    isPosting: false,
    errorText: ""
  };

  componentDidMount() {
    this.setState(this.props.settings);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (!isEqualSimple(prevProps.settings, this.props.settings)) {
      this.setState(this.props.settings);
    }
  }

  handleInputChange = (id, value) => {
    this.setState({ [id]: value, errorText: "" });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ isPosting: true });
      this.props
        .saveSettingsYndx(this.state)
        .then(() => {
          this.setState({ isPosting: false });
          history.push("/history");
        })
        .catch(e => {
          this.setState({ isPosting: false });
          this.setState({ errorText: "произошла ошибка клонирования" });
        });
    } else {
      this.setState({ errorText: "заполните обязательные поля" });
    }
  };

  isFormValid() {
    return this.state.repoName.length > 0 && this.state.buildCommand.length > 0;
  }

  isLoaded() {
    return this.props.settings.repoName.length > 0;
  }

  render() {
    return !this.isLoaded() ? (
      "LOADED"
    ) : (
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
                      valid={!(this.state[item.id] !== "")}
                      id={item.id}
                      inputValue={this.state[item.id] || ""}
                      handleChange={this.handleInputChange}
                      label={item.label}
                      placeholder={item.placeholder}
                      renderAppend={
                        <Button
                          // handleClick={this.handleSubmit}
                          className={{ size: "m", distribute: "center" }}
                          iconName={"inputclose"}
                          iconSize={'m'}
                        />
                      }
                    />
                  </div>
                ))}
              </div>
              <div class="form__controls">
                <Button
                  className={{ size: "m", view: "action" }}
                  text={!this.state.isPosting ? "Save" : "Fetching & Cloning.."}
                  handleClick={this.handleSubmit}
                  mydisabled={this.state.isPosting}
                  // iconName={this.state.isPosting ? "spinner" : false}
                />
                <Button
                  className={{ size: "m", view: "control" }}
                  text="Cancel"
                  mydisabled={this.state.isPosting}
                />
              </div>
              <div class="text text_view_ghost text_size_s">
                {this.state.errorText}
              </div>
            </form>
          </div>
        </div>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = state => {
  return { settings: state.settings };
};

// это уезжает в Start
const mapDispatchToProps = {
  saveSettings,
  getSettingsFromYNDX,
  saveSettingsYndx
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
