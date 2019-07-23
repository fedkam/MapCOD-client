//App.jsx

import React, {Component} from "react";
import MapGis from "./components/MapGis/MapGis.jsx";
import District from "./components/District/District.jsx";
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        columns: [
          { name: 'name', title: 'Территория' },
        ],
        tableColumnExtensions: [
          { columnName: 'name', width: 200, wordWrapEnabled: true  },
      ],
        data: [
          {
            id:30201,
            name:"Алеутский район",
            items:[ 
              { 
                id:30201000001,
                name:"A"
              },
              { 
                id:30201000002,
                name:"B"
              },
              { 
                id:30201000001,
                name:"C"
              },
              { 
                id:30201000002,
                name:"D"
              },
            ],
          },
          {
            id:722,
            name:"Елизовский район",
          },
        ],
      };
  }

  render() {
      return (
          <div className="App-column">
            <div>
              <MapGis />
            </div>
            <div className="App-table">
              <District
              columns = {this.state.columns}
              tableColumnExtensions = {this.state.tableColumnExtensions}
              data = {this.state.data}
              />
            </div>
            <div  className="App-info">
              <h2>InfoTable</h2>
            </div>
          </div>
      );
  }
}


export default App;