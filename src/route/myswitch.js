import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Settings from "../components/Settings";
import App from "../components/App";

export default class Myswitch extends Component {
  render() {
    return (
      <Switch>
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
