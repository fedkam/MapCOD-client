// src/js/components/MapGis.jsx

import React, { Component } from "react";
import {MainCreateMap} from "../createMap.js";


class MapGis extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    MainCreateMap();
  }

  render() {
    return (
      <div id="map" className="MapGis-map"></div>
    );
  }
}

export default MapGis;