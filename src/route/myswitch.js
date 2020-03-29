import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LayoutContainer from "../components/LayoutContainer";
import BuildHistory from "../components/BulidHistory";
import Settings from "../components/Settings";
import Start from "../components/Start";
import RunBuild from "../components/RunBuild";
import BuildLog from "../components/BuildLog";

import { saveSettings, getSettingsFromYNDX } from "../actions/index";
import { history } from "../utils/index";

const isSettingsCached = settings =>
  Object.keys(settings).every(key => settings[key] !== "");

class Myswitch extends Component {
  componentDidMount() {
    if (!isSettingsCached(this.props.settings)) {
      this.props
        .getSettingsFromYNDX()
        // обработка объекта ответа от сервера происходит в actionCreator
        // потому что я его вызываю и сам ручками и с payload ответа от сервера, а это разные объекты
        .then(({ data }) => this.props.saveSettings(data))
        .catch(e => console.error("getSettingsFromYNDX: ", e));
    }
  }

  render() {
    console.log("props from switcher", history);
    return (
      <Switch>
        <Route path="/runbuild" component={RunBuild}>
          <LayoutContainer className={{ size: "s", align: "center" }}>
            <RunBuild />
          </LayoutContainer>
        </Route>
        <Route path="/history">
          <LayoutContainer className={{ size: "s", align: "center" }}>
            <BuildHistory />
            <Route path="/(settings|history)?/runbuild" component={RunBuild}>
              {/* <LayoutContainer className={{ size: "s", align: "center" }}> */}
              {/* <RunBuild /> */}
              {/* </LayoutContainer> */}
            </Route>
          </LayoutContainer>
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route exact path="/">
          {isSettingsCached(this.props.settings) ? (
            <Redirect to="/history" />
          ) : (
            <Start />
          )}
        </Route>
        <Route path="/build/:buildNumber" component={BuildLog} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return { settings: state.settings };
};

const mapDispatchToProps = {
  saveSettings,
  getSettingsFromYNDX
};

export default connect(mapStateToProps, mapDispatchToProps)(Myswitch);
