import React, { Component } from "react";
import List from "./List";
import Card from "./Card";

import { connect } from 'react-redux'
import { saveBuildsToRedux } from '../actions/index'

import api from "../api/schoolciserver";
// import { Convert } from 'ansi-to-html'

// const convert = new Convert()
const cards = items => items.map(item => <Card type="summary" item={item} />);

 class BuildHistory extends Component {
  state = { builds: [] };

  componentDidMount() {
    this.getData();
  }
  
  getData = async () => {
    const builds = await api.get("/builds");
    
    this.props.saveBuildsToRedux(builds.data)
    this.setState({ builds: builds.data });
  };

  render() {
    return <List items={cards(this.state.builds)} />;
  }
 }

const mapStateToProps = (state) => {
   return {builds: state.builds}
}
 
const mapsDispatchToProps = {
  saveBuildsToRedux
}

 export default connect(mapStateToProps,mapsDispatchToProps)(BuildHistory)
