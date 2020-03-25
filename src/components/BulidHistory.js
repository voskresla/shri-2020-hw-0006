import React, { Component } from "react";
import List from "./List";
import Card from "./Card";

import api from "../api/schoolciserver";

const cards = items => items.map(item => <Card type="summary" item={item} />);

export default class BuildHistory extends Component {
  state = { builds: [] };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const builds = await api.get("/builds");

    this.setState({ builds: builds.data });
  };

  render() {
    return (
      <div>
        <List items={cards(this.state.builds)} />
      </div>
    );
  }
}
