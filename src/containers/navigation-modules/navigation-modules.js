import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDistrictData } from "../../actions";
import { compose } from "../../utils";
import { withService } from "../../components/hoc";
import MapGis from '../../components/MapGis';
import District from '../../components/District';
import Info from '../../components/Info';

import { addRowDistrict } from '../../actions';



const NavigationModules = (props) => {
  // const getData = () => {
  //   fetch('http://localhost:9000/transferData')
  //     .then(res => res.json())
  //     .then(res => {
  //       /*res.rowsData.map((district) => {
  //        console.log("componentDidMount()/dis=" + district.name);
  //        this.props.onAddRow(district);
  //       });*/
  //       props.onAddAllDistricts(res.rowsData);
  //     })
  //     .catch(err => err);
  // };
  console.log('NavigationModules', props);

  useEffect(() => {
    props.fetchDistrictData();
  }, []);

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

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch, { dataService }) => {
  return {
    onAddRowDistrict: (addrowdistrict) => dispatch(addRowDistrict(addrowdistrict)),
    fetchDistrictData: fetchDistrictData(dataService, dispatch)
  }
};

export default compose(
  withService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NavigationModules);
