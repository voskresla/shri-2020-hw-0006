import React, { Component } from "react";
import Layout from "./Layout";
import LayoutContainer from "./LayoutContainer";
import Header from "./Header";
import Footer from "./Footer";
import InputGroup from "./InputGroup";
import Button from "./Button";

import api from "./api/schoolciserver";

import "./Settings.css";

const defaultSettings = {
  repoName: "default repoName",
  buildCommand: "default build command",
  mainBranch: "default main branch",
  period: 0
};

const mapSettings = settings =>
  Object.keys(settings).map(key => {
    switch (key) {
      case "repoName":
        return { label: "Github repository", placeholder: settings[key] };
      case "buildCommand":
        return { label: "Build Command", placeholder: settings[key] };
      case "mainBranch":
        return { label: "Main Branch", placeholder: settings[key] };
      case "period":
        return { label: "Synchronize every", placeholder: settings[key] };
      default:
        return false;
    }
  });

export default class Settings extends Component {
  state = { settings: defaultSettings };

  componentDidMount() {
    this.getSettings();
  }

  getSettings = async () => {
    const response = await api.get("/api/settings");

    this.setState({ settings: response.data });
  };

  render() {
    return (
      <Layout>
        <LayoutContainer className={{ size: "s", align: "center" }}>
          <Header />
        </LayoutContainer>
        <LayoutContainer className={{ size: "s", align: "center" }}>
          <div className="grid grid_m-columns_12 grid_col-gap_full grid grid_s-columns_12">
            <div className="grid__fraction grid__fraction_m-col_7">
              <form className="form">
                <div className="form__title">
                  <div className="form__header text text_type_h2 text_size_m">
                    Settings
                  </div>
                  <div className="form__subheader text text_size_s text_view_ghost">
                    Configure repository connection and synchronization
                    settings.
                  </div>
                </div>
                <div className="form__items">
                  {mapSettings(this.state.settings).map(item => (
                    <div className="form__item form__item_indent-b_xl">
                      <InputGroup
                        label={item.label}
                        placeholder={item.placeholder}
                        renderAppend={
                          <Button
                            className={{ size: "m", distribute: "center" }}
                            withIcon={true}
                            withText={false}
                          />
                        }
                      />
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </LayoutContainer>
        <Footer />
      </Layout>
    );
  }
}
