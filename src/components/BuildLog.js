import React, { Component } from "react";
import LayoutContainer from "./LayoutContainer";
import api from "../api/schoolciserver";
import Card from "./Card";
import Convert from "ansi-to-html";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import "./BuildLog.css";

const convert = new Convert();

export default class BuildLog extends Component {
  state = {
    buildNumber: this.props.match.params.buildNumber,
    buildInfo: [],
    logs: ""
  };

  componentDidMount() {
    this.getBuildList();
  }

  // отдает только первые 25. плохо. надо думать.
  getBuildList = async () => {
    const response = await api.get(`/builds`);

    const buildInfo = response.data.filter(
      e => e.buildNumber.toString() === this.state.buildNumber
    );

    const { id: buildId } = buildInfo[0];

    const logs = await api.get(`/builds/${buildId}/logs`);

    this.setState({ logs, buildInfo });
  };

  isLoading() {}

  render() {
    // почему тут рендериться аж 4 раза?
    // console.log("render buildLog");
    const card = this.state.buildInfo.map(item => (
      <Card type="summary" item={item} />
    ));

    const isLoading = this.state.buildInfo.length === 0;

    return !isLoading ? (
      <>
        <LayoutContainer
          className={{
            size: "s",
            align: "center",
            "indent-b": "12",
            "m-indent-b": "16"
          }}
        >
          <div class="list">
            <div class="list__item">{card}</div>
          </div>
        </LayoutContainer>

        <LayoutContainer
          className={{
            align: "center",
            size: "m-full",
            "indent-b": "20",
            "m-indent-b": "16"
          }}
        >
          <div class="log">
            <div class="log__pre log__pre_scroll">
              <pre class="pre">
                {this.state.logs.data?.length > 0 &&
                  convert.toHtml(this.state.logs.data)}
              </pre>
            </div>
          </div>
        </LayoutContainer>
      </>
    ) : (
      "loading"
    );
  }
}
