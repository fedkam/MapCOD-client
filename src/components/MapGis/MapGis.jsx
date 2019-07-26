// src/js/components/MapGis.jsx

import React, { Component } from "react";
import {MainCreateMap} from "../createMap.js";

import store from '../../store';


class MapGis extends Component {
  componentDidMount() {
  	store.subscribe(() => console.log('MapGis/componentDidMount()/store.subscribe'));
    MainCreateMap();
    console.log("MapGis/componentDidMount()/");
  }

  render() {
    return (
      <div id="map" className="MapGis-map"></div>
    );
  }
}

export default MapGis;