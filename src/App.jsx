//App.jsx

import React, {Component} from "react";
import { connect } from 'react-redux';
import MapGis from "./components/MapGis/MapGis.jsx";
import District from "./components/District/District.jsx";
import './App.css';

const rowsData1 = [
          {
            id:30201,
            name:"Алеутский район",
          },
          {
            id:722,
            name:"Елизовский район",
          }
        ];

  const rowsData =
          {
            id:30201,
            name:"Алеутский район",
          };


class App extends Component {
    Test(){
      console.log("Test()/rowsData=" + rowsData);
      this.props.onTest(rowsData);
    }
    
    render() {
      console.log("render/rowsData=" + rowsData);
      //this.props.onTest(rowsData);
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
              <button onClick={this.Test.bind(this)}>Вызвать action</button>
            </div>
          </div>
      );
  }
}


export default connect(
  state => state,
  dispatch => ({
    onTest: (addrows) => {
      dispatch({type: 'INIT_DATA', addrows});
    }
  }))(App);