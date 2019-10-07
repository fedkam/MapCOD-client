import React from 'react';
import { fetchData } from "../../actions";
import { compose } from "../../utils";
import { withService } from "../../components/hoc";
import MapGis from '../../components/MapGis';
import District from '../../components/District';
import Info from '../../components/Info';

const NavigationModules = () => {
  return (
    <div className="App-column">
      <div>
        <MapGis/>
      </div>
      <div className="App-table">
        <District/>
      </div>
      <div  className="App-info">
        <Info/>
      </div>
    </div>
  );
}

export default NavigationModules;
