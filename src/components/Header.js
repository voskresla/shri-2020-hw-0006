import React, { Component } from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";
import "./Header.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Header extends Component {
  // TODO: получать текст Header из route?
  render() {
    return (
      <div className="header">
        <div className="header__content header__content_distribute_betwen">
          <div className="header__title">
            <div className="text text_type_h1 text_size_xl text_view_ghost">
              <Link to="/">School CI Server</Link>
            </div>
          </div>
          <div className="header__controls">
            <Route
              exact
              path="/"
              render={() => (
                <LinkButton
                  className={{
                    size: "s",
                    distribute: "center",
                    view: "control"
                  }}
                  text={"Settings"}
                  iconName={"settings"}
                  hideMobile={true}
                  href={"/settings"}
                />
              )}
            />
            <Route
              exact
              path="/history"
              render={() => (
                <>
                  <LinkButton
                    className={{
                      size: "s",
                      distribute: "center",
                      view: "control"
                    }}
                    text={"Run build"}
                    iconName={"run"}
                    hideMobile={true}
                    // TODO: куда ведет кнопка Run build ?
                    href={""}
                  />
                  <LinkButton
                    className={{
                      size: "s",
                      distribute: "center",
                      view: "control"
                    }}
                    iconName={"settings"}
                    hideMobile={true}
                    href={"/settings"}
                  />
                </>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
