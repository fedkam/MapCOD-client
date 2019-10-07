//App.jsx

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { HomePage } from '../pages';
import './App.css';
import { addRowDistrict, addAllDistricts } from '../../actions';
import { compose } from "../../utils";
import { withService } from "../hoc";

class App extends Component {
    getData(){
      fetch('http://localhost:9000/transferData')
        .then(res => res.json())
        .then(res => {
          /*res.rowsData.map((district) => {
	         console.log("componentDidMount()/dis=" + district.name);
	         this.props.onAddRow(district);
          });*/
          this.props.onAddAllDistricts(res.rowsData);
        })
        .catch(err => err);
    }

    componentDidMount() {
      this.getData();
    }

    render() {
    	return (
        <main role="main">
          <Switch>
            <Route path="/" component={HomePage} exact />
          </Switch>
        </main>);
    }
}

const mapStateToProps = state => state.data;

const mapDispatchToProps = dispatch => {
  return {
    onAddRowDistrict: (addrowdistrict) => dispatch(addRowDistrict(addrowdistrict)),
    onAddAllDistricts: (addalldistricts) => dispatch(addAllDistricts(addalldistricts))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


// сделать правильный запрос   fetch('http://localhost:9000/transferData')
