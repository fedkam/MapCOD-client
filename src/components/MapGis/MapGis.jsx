// src/js/components/MapGis.jsx

import React from 'react';
import DG from '2gis-maps';
import pinRasco from '../../images/RascoMsoKseon/pinRasco.png';
import pinMso from '../../images/RascoMsoKseon/pinMso.png';
import { connect } from 'react-redux';

let map;
const mapStateToProps = state => state.data;


const mapDispatchToProps = dispatch => {
  //onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
};


export const setViewByCoordinates = (latitude=58, longitude=162, sizeMap=5) => {
		map.setView([latitude, longitude], sizeMap);
};


const createMap = (latitude=58, longitude=162, sizeMap=5) => {
	    if(!map){
	      map = DG.map('map', {
	          center: [latitude, longitude],
	          zoom: sizeMap,
	          zoomControl: false,
	          geoclicker: false,
	          prefix:'TestText',
	          });
	      DG.control.ruler({position: 'bottomleft'}).addTo(map);
	    }
};


const createIcon = (icon) => {
		let iconSize = 32;     //Размер Иконки
	    let iconPin = iconSize/2; //точка позиционирования Иконки на карте по оси X
	    return(
	    		DG.icon({
	            //Стиль иконки
	            iconUrl: icon,
	            iconSize: [iconSize, iconSize],
	            iconAnchor: [iconPin, iconSize], //позиционирование
	      		})
	    );
};


const createMarker = (latitude, longitude, headerContent, contentVilladge, contentStreet, icon) => {
		return  DG.marker([ latitude, longitude], {icon: icon})
			      	.addTo(map)
			      	.bindLabel('<h3>'+ headerContent +'</h3>'+ contentVilladge +', '+  contentStreet)
			      	.bindPopup(
			      		DG.popup()
			      		  .setLatLng([ latitude, longitude])
			      		  .setHeaderContent( headerContent)
			      		  .setContent( contentVilladge + ' ' + contentStreet)
			      	)
};


const createOnClickMarker = (markerGroup) => {
		//Создается группа + обработчик click на элементы группы
		DG.featureGroup(markerGroup)
		  .addTo(map)
		  .on('click', (e) => setViewByCoordinates(e.latlng.lat, e.latlng.lng, 8));
};


const addMarker = (latitude, longitude, headerContent, contentVilladge, contentStreet, icon, toReturn=true) => {
		if(toReturn){
	     	return  createMarker(latitude, longitude, headerContent, contentVilladge, contentStreet, icon);
		}else{
	      //просто добавить
	       createMarker(latitude, longitude, headerContent, contentVilladge, contentStreet, icon);
	    }
	    // пример:  addMarker(52.824913, 156.283973, 'Усть-Большерецкий район', 'с. Усть-Большерецк', 'Октябрьская, 14', myIconRasco, false);
};


const addMarkers = (districtsData) => {
	  let iconRasco, iconMSO;
		let alertLevel;
	    let markerGroup = []; //Для аккумулирования объектов Marker

	    iconRasco = createIcon(pinRasco);
	    iconMSO	= createIcon(pinMso);

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
									marker = addMarker(street.latitude,
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
		createOnClickMarker(markerGroup);
};


function MapGis(props){
	const districtsData = props.rows;

	if(districtsData.length){
		createMap();
		addMarkers(districtsData);
	}else{
		console.log('MapGis/render() loading data');
	}

	return (
		<div id='map' className='MapGis-map'></div>
	);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapGis);
