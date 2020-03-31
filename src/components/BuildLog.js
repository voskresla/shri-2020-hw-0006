import React, { Component } from "react";
import LayoutContainer from "./LayoutContainer";
import api from "../api/schoolciserver";
import Card from "./Card";
import Convert from "ansi-to-html";

import { connect } from 'react-redux'

import { saveCurrentBuildToRedux } from '../actions/index'


import "./BuildLog.css";

const convert = new Convert({
  newline: true,
  fg: '#000',
  escapeXML: true
});


class BuildLog extends Component {
  state = {
    buildNumber: this.props.match.params.buildNumber,
    buildInfo: [],
    logs: ""
  };

  componentDidMount() {
    this.getBuildList();
    
  }

  componentDidUpdate(prevProps) {
    console.log('fire did update')
    // // Typical usage (don't forget to compare props):
    if (this.props.match.params.buildNumber !== prevProps.match.params.buildNumber) {
      this.setState({ buildNumber: this.props.match.params.buildNumber, buildInfo:[] });
      this.getBuildList()
      // console.log('fire setState')
    }
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
    document.querySelector('.inner').innerHTML = convert.toHtml('> shri-2020-task-1@1.0.0 build \n> webpack --mode=production \"--colors\"\n\nHash: \u001b[1me541e85eb5e88a853b17\u001b[39m\u001b[22m\nVersion: webpack \u001b[1m4.41.5\u001b[39m\u001b[22m\nTime: \u001b[1m1782\u001b[39m\u001b[22mms\nBuilt at: 2020-03-30 \u001b[1m0:39:32\u001b[39m\u001b[22m\n        \u001b[1mAsset\u001b[39m\u001b[22m      \u001b[1mSize\u001b[39m\u001b[22m  \u001b[1mChunks\u001b[39m\u001b[22m  \u001b[1m\u001b[39m\u001b[22m                 \u001b[1m\u001b[39m\u001b[22m\u001b[1mChunk Names\u001b[39m\u001b[22m\n    \u001b[1m\u001b[32mscript.js\u001b[39m\u001b[22m  1.83 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted]\u001b[39m\u001b[22m        main\n\u001b[1m\u001b[32mscript.js.map\u001b[39m\u001b[22m  7.03 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted] [dev]\u001b[39m\u001b[22m  main\n    \u001b[1m\u001b[32mstyle.css\u001b[39m\u001b[22m  20.5 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted]\u001b[39m\u001b[22m        main\n\u001b[1m\u001b[32mstyle.css.map\u001b[39m\u001b[22m  24.8 KiB       \u001b[1m0\u001b[39m\u001b[22m  \u001b[1m\u001b[32m[emitted] [dev]\u001b[39m\u001b[22m  main\nEntrypoint \u001b[1mmain\u001b[39m\u001b[22m = \u001b[1m\u001b[32mstyle.css\u001b[39m\u001b[22m \u001b[1m\u001b[32mscript.js\u001b[39m\u001b[22m \u001b[1m\u001b[32mstyle.css.map\u001b[39m\u001b[22m \u001b[1m\u001b[32mscript.js.map\u001b[39m\u001b[22m\n[0] \u001b[1m./src/js/utils.js\u001b[39m\u001b[22m 514 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[1] \u001b[1mmulti ./src/js/_index.js ./src/scss/index.scss\u001b[39m\u001b[22m 40 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[2] \u001b[1m./src/js/_index.js\u001b[39m\u001b[22m 89 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[3] \u001b[1m./src/js/onoffswitch.js\u001b[39m\u001b[22m 654 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[4] \u001b[1m./src/js/e-accordion.js\u001b[39m\u001b[22m 403 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n[5] \u001b[1m./src/scss/index.scss\u001b[39m\u001b[22m 39 bytes {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n    + 1 hidden module\nChild \u001b[1mmini-css-extract-plugin node_modules/css-loader/dist/cjs.js??ref--5-1!node_modules/postcss-loader/src/index.js!node_modules/sass-loader/dist/cjs.js!src/scss/index.scss\u001b[39m\u001b[22m:\n    Entrypoint \u001b[1mmini-css-extract-plugin\u001b[39m\u001b[22m = \u001b[1m\u001b[32m*\u001b[39m\u001b[22m\n    [0] \u001b[1m./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/scss/index.scss\u001b[39m\u001b[22m 20.7 KiB {\u001b[1m\u001b[33m0\u001b[39m\u001b[22m}\u001b[1m\u001b[32m [built]\u001b[39m\u001b[22m\n        + 1 hidden module\n')
    this.props.saveCurrentBuildToRedux(buildInfo[0])
    
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
              <div class="pre">
                {this.state.logs.data?.length > 0 &&
                  <div class='inner'></div>
                }
              </div>
            </div>
          </div>
        </LayoutContainer>
      </>
    ) : (
      "loading"
    );
  }
}

const mapsDispatchToProps = {
 saveCurrentBuildToRedux
}


export default connect(null, mapsDispatchToProps)(BuildLog)
