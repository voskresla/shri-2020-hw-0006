import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BuildHistory from "../components/BulidHistory";
import Settings from "../components/Settings";
import App from "../components/App";

export default class Myswitch extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/history">
          <BuildHistory />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    );
  }
}
