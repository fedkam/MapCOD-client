//App.jsx

import React, {Component} from "react";
import { connect } from 'react-redux';
import MapGis from "./components/MapGis/MapGis.jsx";
import District from "./components/District/District.jsx";
import './App.css';

const initialDataState2 = {
  rows: [
          {
            id:30201,
            name:"Алеутский район",
            items:[ 
              { 
                id:30201000001,
                name:"A"
              },
            ],
          },
          {
            id:722,
            name:"Елизовский район",
          }
  ]
};

class App extends Component {
    render() {
      //this.props.onTest(initialDataState2);
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


export default connect(
  null,
  dispatch => ({
    onTest: (tests) => {
      dispatch({type: 'INIT_DATA', data: tests});
    }
  }))(App);