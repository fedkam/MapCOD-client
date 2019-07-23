//App.jsx

import React, {Component} from "react";
import MapGis from "./components/MapGis/MapGis.jsx";
import District from "./components/District/District.jsx";
import './App.css';

class App extends Component {
  render() {
      return (
          <div className="App-column">
            <div>
              <MapGis/>
            </div>
            <div className="App-table">
              <District/>
            </div>
            <div  className="App-info">
              <h2>InfoTable</h2>
            </div>
          </div>
      );
  }
}


export default App;