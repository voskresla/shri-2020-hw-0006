import React, { Component } from "react";
import Button from "./Button";
import "./Header.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__content header__content_distribute_betwen">
          <div className="header__title">
            <div className="text text_type_h1 text_size_xl text_view_ghost">
              School CI Server
            </div>
          </div>
          <div className="header__controls">
            <Route
              exact
              path="/"
              render={() => (
                <Link to="/settings">
                  <Button
                    className={{
                      size: "s",
                      distribute: "center",
                      view: "control"
                    }}
                    text={"Settings"}
                    withIcon={true}
                    hide={"hide_mobile"}
                  />
                </Link>
              )}
            />
            <Route
              path="/settings"
              render={() => (
                <>
                  <Link to="/">
                    <Button
                      className={{
                        size: "s",
                        distribute: "center",
                        view: "control"
                      }}
                      text={"Settings"}
                      withIcon={true}
                      hide={"hide_mobile"}
                    />
                  </Link>
                  <Link>
                    <Button
                      className={{
                        size: "s",
                        distribute: "center",
                        view: "control"
                      }}
                      text={"Settings"}
                      withIcon={true}
                      hide={"hide_mobile"}
                    />
                  </Link>
                </>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
