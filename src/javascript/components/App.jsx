// src/js/components/App.jsx

import React, {Component} from "react";
import MapGis from "./MapGis.jsx";
import './App.css';
//import TreeTable from "./TreeTable.jsx";

class App extends Component {
  render() {
      return (
          <div className="App-column">
            <div>
              <MapGis />
            </div>
            <div>
              <h2>TreeTable</h2>
              
            </div>
            <div>
              <h2>InfoTable</h2>
              
            </div>
          </div>
      );
  }
}


export default App;