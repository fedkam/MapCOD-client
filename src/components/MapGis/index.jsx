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

		map.eachLayer( (layer) =>{
				if(layer.districtId == selectedStreet.selectedIndex){
					console.log("select layer.districtId=",layer.districtId);
				}
		});

	};


	const handleClickStreet = () => {
		setIconSelectedPin(selectedStreet);
		setViewByCoordinates(selectedStreet.latitude, selectedStreet.longitude, 15);
	}

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

	const createMarker = (village, street, icon) => {
		let marker;
		marker = DG.marker([ street.latitude, street.longitude], {icon: icon})
								.addTo(map)
								.on('click', handleClickStreet)
								.bindLabel('<h3>'+  village.name +'</h3>'+', '+  street.name)
				      	/*.bindPopup(
				      		DG.popup()
				      		  .setLatLng([ latitude, longitude])
				      		  .setHeaderContent( headerContent)
				      		  .setContent( contentVilladge + ' ' + contentStreet)
				      	);*/
		marker['districtId'] = street.id;
		return marker;
	};

	const addMarker = (village, street, icon, toReturn=false) => {
			if(toReturn){
		     	return  createMarker(village, street, icon);
			}else{
		      //просто добавить
		      markerGroup.push(createMarker(village, street, icon));
		    }
	};

	const addMarkers = (districtsData) => {
		for(let district of districtsData){
					if(district['items']){
						for(let village of district.items){
							if(village['items']){
								for(let street of village.items){
										addMarker(village,
															street,
															alertLevel(street.level),
															false);
													//markerGroup.push(marker);
													//console.log('lvl_1 '+ district.name + 'lvl_2 '+ village.name + 'lvl_3 '+ street.name);
								}
							}else{  //здесь ПК итп
									addMarker(district,
														village,
														alertLevel(village.level),
														false);
									//markerGroup.push(marker);
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
