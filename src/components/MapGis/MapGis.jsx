// src/js/components/MapGis.jsx

import React, { Component } from "react";
///import {MainCreateMap} from "../createMap.js";

import DG from "2gis-maps";
import pinRasco from "../../images/RascoMsoKseon/pinRasco.png";
import pinMso from "../../images/RascoMsoKseon/pinMso.png";
import pin from "../../images/RascoMsoKseon/pin.png";

import store from '../../store';

var map;
var readFile ="DefaultValue";
var puthIcons = [pinRasco, pinMso, pin];
var RascoData;
var MsoData;

class MapGis extends Component {

	createMap(){
	    if(!map){
	      map = DG.map('map', {
	          center: [58, 162],
	          zoom: 5
	          });
	    }
  	}

  	addMarker(_latitude, _longitude, _headerContent, _contentVilladge, _contentStreet, _icon, _toReturn = true){
	    let bindLabelAllArguments = "<h3>"+ _headerContent +" муниципальный район"+"</h3>"+ _contentVilladge +", "+  _contentStreet;
	    if(_toReturn){
	      return (DG.marker([ _latitude, _longitude], {icon: _icon}).addTo(map).bindPopup(DG.popup().setLatLng([ _latitude, _longitude]).setHeaderContent( _headerContent).setContent( _contentVilladge + "/n" + _contentStreet)).bindLabel(bindLabelAllArguments));
	    }else{
	      //просто добавить 
	      DG.marker([ _latitude, _longitude], {icon: _icon}).addTo(map).bindPopup(DG.popup().setLatLng([ _latitude, _longitude]).setHeaderContent( _headerContent).setContent( _contentVilladge + "/n" + _contentStreet)).bindLabel(bindLabelAllArguments);
	    }
	}

	addMarkers(_rascoData, _icon){
	    let _iconSize = 32;     //Размер Иконки
	    let _iconPin = _iconSize/2; //точка позиционирования Иконки на карте по оси X
	    let markerGroup = [];     //Для аккамулирования объектов Marker
	    let groupForMap = [];     //Для добавления обработчика на markerGroup[]
	    let myIconRasco;

	    myIconRasco = DG.icon({
	                    //Стиль иконки
	                    iconUrl: _icon,
	                    iconSize: [_iconSize, _iconSize],
	                    iconAnchor: [_iconPin,_iconSize] //позиционирование
	                });

	    for(var _lvl1 in _rascoData){
	      let marker;
	          marker = this.addMarker(_rascoData[_lvl1][0], _rascoData[_lvl1][1], _rascoData[_lvl1][2], _rascoData[_lvl1][3], _rascoData[_lvl1][4], myIconRasco, true)
	          markerGroup.push(marker); //Аккумулирую объекты Marker в массив
	        }

	        groupForMap = DG.featureGroup(markerGroup).addTo(map).on('click', function(e) { map.setView([e.latlng.lat, e.latlng.lng], 8);}); //Создается группа + обработчик любой на элемент Гр.
	}

	componentDidMount() {
	  	store.subscribe(() => console.log('MapGis/componentDidMount()/store.subscribe'));
	  	console.log("MapGis/componentDidMount()/");
	  	///MainCreateMap();
	  	this.createMap();
	}

	render() {
	    return (
	      <div id="map" className="MapGis-map"></div>
	    );
	}
}

export default MapGis;