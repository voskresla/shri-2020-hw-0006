import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import BuildHistory from "../components/BulidHistory";
import Settings from "../components/Settings";
import App from "../components/App";

const isSettingsCached = settings =>
  Object.keys(settings).every(key => settings[key] !== "");
class Myswitch extends Component {
  // состоняние в Switch это выглядит очень плохо
  // для првоерки есть ли настройки мы можем сделать компонент обертку (не нравится)
  // редиректить в App?

  render() {
    return (
      <Switch>
        <Route exact path="/history">
          <BuildHistory />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route exact path="/">
          {isSettingsCached(this.props.settings) ? <BuildHistory /> : <App />}
        </Route>
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return { settings: state.settings };
};

export default connect(mapStateToProps)(Myswitch);
