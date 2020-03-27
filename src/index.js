import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Myswitch from "./route/myswitch";
import LayoutContainer from "./components/LayoutContainer";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./index.css";
import { history } from "./utils";

import reducers from "./reducers/";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <div
          className="App page theme theme_color_project-default theme_size_default
    theme_space_default theme_gap_small theme_icon-size_default"
        >
          <Layout>
            <LayoutContainer className={{ size: "s", align: "center" }}>
              <Header />
            </LayoutContainer>
            <Myswitch />
            <Footer />
          </Layout>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
