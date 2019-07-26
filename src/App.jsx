//App.jsx

import React, {Component} from 'react';
import { connect } from 'react-redux';
import MapGis from './components/MapGis/MapGis.jsx';
import District from './components/District/District.jsx';
import './App.css';
import {ADD_DATA, addData} from './actions';


const rowsData = [
          {
            id:1,
            name:"Алеутский район",
            items:[ 
              { 
                id:1.1,
                name:"село"
              },
            ],
          },
          {
            id:2,
            name:"Быстринский район",
            items:[ 
              { 
                id:2.1,
                name:"село"
              },
            ],
          },
          {
            id:3,
            name:"Елизовский район",
            items:[ 
              { 
                id:3.1,
                name:"село"
              },
            ],
          },
          {
            id:4,
            name:"Карагинский район",
            items:[ 
              { 
                id:4.1,
                name:"село"
              },
            ],
          },
          {
            id:4,
            name:"Мильковский район",
            items:[ 
              { 
                id:4.1,
                name:"село"
              },
            ],
          },
          {
            id:4,
            name:"Олюторский район",
            items:[ 
              { 
                id:4.1,
                name:"село"
              },
            ],
          },
          {
            id:4,
            name:"Пенжинский район",
            items:[ 
              { 
                id:4.1,
                name:"село"
              },
            ],
          },
          {
            id:4,
            name:"Соболевский район",
            items:[ 
              { 
                id:4.1,
                name:"село"
              },
            ],
          },
          {
            id:4,
            name:"Тигильский район",
            items:[ 
              { 
                id:4.1,
                name:"село"
              },
            ],
          },
          {
            id:4,
            name:"Усть-Большерецкий район",
            items:[ 
              { 
                id:4.1,
                name:"село"
              },
            ],
          },
          {
            id:4,
            name:"Усть-Камчатский район",
            items:[ 
              { 
                id:4.1,
                name:"село"
              },
            ],
          },
];
    


class App extends Component {
    
    getData(){
      fetch('http://localhost:9000/transferData')
        .then(res => res.json())
        .then(res => {
          rowsData = res.rowsData;
          //RascoData = res.Rasco;
          //MsoData = res.Mso;
          //addMarkers(RascoData, puthIcons[0]);
         // addMarkers(MsoData, puthIcons[1]);
          //console.log(RascoData, MsoData);
          console.log("getData()");
        })
        .catch(err => err);
    }

    componentDidMount() {
      this.getData();
      rowsData.map((district) => {
         //console.log("componentDidMount()/dis=" + district.name);
         //this.props.onAddRow(district);
      });
    }

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


export default connect(
  state => state,
  dispatch => ({
    onAddRow: (addrow) => {
      dispatch(addData(addrow));
    },
    }))(App);