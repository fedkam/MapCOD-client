// src/js/components/MapGis.jsx

import React, { Component } from 'react';
///import {MainCreateMap} from '../createMap.js';

import DG from '2gis-maps';
import pinRasco from '../../images/RascoMsoKseon/pinRasco.png';
import pinMso from '../../images/RascoMsoKseon/pinMso.png';
import pin from '../../images/RascoMsoKseon/pin.png';

import { connect } from 'react-redux';
import store from '../../store';


var map;
var readFile ='DefaultValue';
var puthIcons = [pinRasco, pinMso, pin];
var districtsData;
var MsoData;


const mapStateToProps = state => state.data;


const mapDispatchToProps = dispatch => ({
  //onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
});


class MapGis extends Component {

	createMap(){
	    if(!map){
	      map = DG.map('map', {
	          center: [58, 162],
	          zoom: 5
	          });
	    }
  	}

	setIcon(icon){
		let iconSize = 32;     //Размер Иконки
	    let iconPin = iconSize/2; //точка позиционирования Иконки на карте по оси X
	    return(	
	    		DG.icon({
	            //Стиль иконки
	            iconUrl: icon,
	            iconSize: [iconSize, iconSize],
	            iconAnchor: [iconPin, iconSize] //позиционирование
	      		})
	    );
	}

  	addMarker(latitude, longitude, headerContent, contentVilladge, contentStreet, icon, toReturn = true){
	    let bindLabelAllArguments = '<h3>'+ headerContent +'муниципальный район'+'</h3>'+ contentVilladge +', '+  contentStreet;
	    if(toReturn){
	     	return (
	      		  DG.marker([ latitude, longitude], {icon: icon})
			      	.addTo(map)
			      	.bindLabel(bindLabelAllArguments)
			      	.bindPopup(
			      		DG.popup()
			      		  .setLatLng([ latitude, longitude])
			      		  .setHeaderContent( headerContent)
			      		  .setContent( contentVilladge + ' ' + contentStreet)
			      	)
			);

	    }else{
	      //просто добавить 
	      DG.marker([ latitude, longitude], {icon: icon})
	      	.addTo(map)
	      	.bindLabel(bindLabelAllArguments)
	      	.bindPopup(
	      		DG.popup()
	      		  .setLatLng([ latitude, longitude])
	      		  .setHeaderContent( headerContent)
	      		  .setContent( contentVilladge + '/n' + contentStreet)
	      	);
	    }
	}


	addMarkers(districtsData){
	    let iconRasco, iconMSO;
		let alertLevel;
	    let markerGroup = [];     //Для аккумулирования объектов Marker
	    let onClickMarkerMap = [];     //Для добавления обработчика на markerGroup[]

	    iconRasco =  this.setIcon(pinRasco);
	    iconMSO	= this.setIcon(pinMso);
	    
	    alertLevel = (level) => {
	    	if(level === 'RASCO'){
	    		return iconRasco;
	    	}else if(level === 'MSO'){
	    		return iconMSO;
	    	}
	    };

		for(let district of districtsData){
				if(district['items']){
					for(let village of district.items){
						if(village['items']){
							for(let street of village.items){
								let marker;
									marker = this.addMarker(street.latitude,
															street.longitude,
															district.name,
															village.name,
															street.name,
															alertLevel(street.level),
															true);
	          						markerGroup.push(marker);//Аккумулирую объекты Marker в массив
	          						//console.log('lvl_1 '+ district.name + 'lvl_2 '+ village.name + 'lvl_3 '+ street.name);
							}
						}
					}
				}
		}

		onClickMarkerMap = DG.featureGroup(markerGroup)
							 .addTo(map)
							 .on('click', function(e) {
							 	 map.setView([e.latlng.lat, e.latlng.lng], 8);
							 }); //Создается группа + обработчик click на элемент группы
	}

	componentDidMount() {
	  	store.subscribe(() => console.log('MapGis/componentDidMount()/store.subscribe'));
	  	///MainCreateMap();
	  	this.createMap();
	  	
	  	let myIconRasco;

	    myIconRasco = this.setIcon(pinRasco);

	   	this.addMarker(52.824913, 156.283973, 'Усть-Большерецкий район', 'с. Усть-Большерецк', 'Октябрьская, 14', myIconRasco, false);
	}

	render() {
		const districtsData = this.props.rows;

		if(districtsData.length){
			this.addMarkers(districtsData,)
		}else{
			console.log('render()= false');	
		}
		
	    return (
	      <div id='map' className='MapGis-map'></div>
	    );
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapGis);