// src/js/components/MapGis.jsx

import React from 'react';
import DG from '2gis-maps';
import pinRasco from '../../images/pins/pinRasco.png';
import pinMso from '../../images/pins/pinMso.png';
import pinKseon from '../../images/pins/pinKseon.png';
import pinLso from '../../images/pins/pinLso.png';
import pinSelect from '../../images/pins/pinSelect.png';
import { connect } from 'react-redux';
let map;


const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => {
  //onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
};


//Main
function MapGis(props){
	let markerGroup = [];
	const districtsData = props.data.rows;
	const selectedStreet = String(props.selectedStreet);



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


	const setViewByCoordinates = (latitude=58, longitude=162, sizeMap=5) => {
			map.setView([latitude, longitude], sizeMap);
	};


	const setIconSelectedPin = (selectedStreet) => {
		if(markerGroup.find( marker => marker.districtId == selectedStreet.selectedIndex)){
			markerGroup.find( marker => marker.districtId == selectedStreet.selectedIndex).setIcon(alertLevel('SELECT'));
		}
	};


	const handleClickStreet = () => {
		setIconSelectedPin(selectedStreet);
		setViewByCoordinates(selectedStreet.latitude, selectedStreet.longitude, 15);
	}

	const createMarker = (latitude, longitude, headerContent, contentVilladge, contentStreet, icon) => {
			return  DG.marker([ latitude, longitude], {icon: icon})
								//.addTo(map)
								.on('click', handleClickStreet)
								.bindLabel('<h3>'+ headerContent +'</h3>'+ contentVilladge +', '+  contentStreet)
				      	/*.bindPopup(
				      		DG.popup()
				      		  .setLatLng([ latitude, longitude])
				      		  .setHeaderContent( headerContent)
				      		  .setContent( contentVilladge + ' ' + contentStreet)
				      	);*/
	};


const createFeatureGroup = (markerGroup) => {
			//обработка событий на группу маркеров
			
			DG.featureGroup(markerGroup)
			  .addTo(map);
			console.log(DG.featureGroup(markerGroup).hasLayer(map));


	};


const createIcon = (icon) => {
			let iconSize = 32;     //Размер Иконки
			let iconPin = iconSize / 2; //точка позиционирования Иконки на карте по оси X
			return(
						DG.icon({
								//Стиль иконки
								iconUrl: icon,
								iconSize: [iconSize, iconSize],
								iconAnchor: [iconPin, iconSize], //позиционирование
						})
			);
	};


	const alertLevel = (level) => {
		if(level === 'RASCO'){
			return createIcon(pinRasco);
		}else if(level === 'KSEON'){
			return createIcon(pinKseon);
		}else if(level === 'MSO'){
			return createIcon(pinMso)
		}else if(level === 'LSO'){
			return createIcon(pinLso);
		}else if(level === 'SELECT'){
			return createIcon(pinSelect);
		}
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
		for(let district of districtsData){
					let marker;
					if(district['items']){
						for(let village of district.items){
							if(village['items']){
								for(let street of village.items){
													marker = addMarker(street.latitude,
															street.longitude,
															district.name,
															village.name,
															street.name,
															alertLevel(street.level),
															true);
													marker['districtId'] = street.id;
													markerGroup.push(marker);
													//console.log('lvl_1 '+ district.name + 'lvl_2 '+ village.name + 'lvl_3 '+ street.name);
								}
							}else{  //здесь ПК итп
								marker = addMarker(village.latitude,
										village.longitude,
										district.name,
										village.name,
										village.name,
										alertLevel(village.level),
										true);
								marker['districtId'] = village.id;
								markerGroup.push(marker);
							}
						}
					}
			}
			createFeatureGroup(markerGroup);
			//markerGroup.find(x=>x.districtId==3).setIcon(alertLevel('MSO'));
			console.log("m",markerGroup.find(x=>x.districtId==3));
			//markerGroup['3'].setIcon(alertLevel('MSO'));
	};


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


//продумать тройной перебор(обощить)
