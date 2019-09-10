// src/js/components/MapGis.jsx

import React, {useMemo} from 'react';
import DG from '2gis-maps';
import pinRasco from '../../images/pins/pinRasco.png';
import pinMso from '../../images/pins/pinMso.png';
import pinKseon from '../../images/pins/pinKseon.png';
import pinLso from '../../images/pins/pinLso.png';
import pinSelect from '../../images/pins/pinSelect.png';
import { connect } from 'react-redux';
import { addSelectedStreet } from '../../actions';
let map;


const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({
  onAddSelectedStreet: (addselectedstreet) => {
    console.log(addselectedstreet);
    dispatch(addSelectedStreet(addselectedstreet));
  }
});


//Main
function MapGis(props){
	const districtsData = props.data.rows;
	const selectedIndex = props.selectedStreet.selectedIndex;

	//установка координат и масштаба на карте
	const setViewByCoordinates = (latitude=58, longitude=164, sizeMap=5) => {
			if(map.getZoom() > sizeMap && sizeMap!==5){
				sizeMap=map.getZoom();
			}
			map.setView([latitude, longitude], sizeMap);
	};
	//изменение иконки при выбранном маркере на карте
	const setIconSelectedPin = (selectedIndex) => {
		map.eachLayer( (layer) => {
				if(layer.districtId == selectedIndex){
					layer.setIcon(alertLevelIcon('SELECT'));
					layer.setZIndexOffset(1000);
				}
		});
	};
	//настроить отображение и иконку для выделенного маркера
	const setSelectedPin = (selectedStreet) => {
		if(selectedIndex !== undefined){
			let LatLng;
			map.eachLayer( (layer) => {
					if(layer.districtId == selectedIndex){
						LatLng = layer.getLatLng();
					}
			});
			setIconSelectedPin(selectedIndex);
			setViewByCoordinates(LatLng.lat, LatLng.lng, 7);
		}else{
			setViewByCoordinates();
		}
	}
	//обработчик нажатия, обновление Store
	const handleClickStreet = (e) => {
			if(selectedIndex !== e.target.districtId){
					props.onAddSelectedStreet(e.target.districtId);
			}else{
					props.onAddSelectedStreet(undefined);
			}
	}
	//определение района для иконки мркера
	const alertLevelIcon = (level) => {
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

	const createMap = (latitude=58, longitude=162, sizeMap=5) => {
				//map && map.remove();
				if(!map){
		      map = DG.map('map', {
		          center: [latitude, longitude],
		          zoom: sizeMap,
		          zoomControl: false,
		          geoclicker: false,
		          prefix:'',
		          });
		      DG.control.ruler({position: 'bottomleft'}).addTo(map);
				}
		};

	const clearMap = () => {
		map.eachLayer( (layer) => {
				if(layer.districtId){
					layer.remove();
				}
		});
	}

	const createMarker = (village, street, icon) => {
		let marker;
		marker = DG.marker([ street.latitude, street.longitude], {icon: icon})
								.on('click', e => handleClickStreet(e))
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
		     	return  createMarker(village, street, icon); //Not use
			}else{
		      createMarker(village, street, icon).addTo(map);
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
															alertLevelIcon(street.level),
															false);
													//console.log('lvl_1 '+ district.name + 'lvl_2 '+ village.name + 'lvl_3 '+ street.name);
								}
							}else{  //здесь ПК итп
									addMarker(district,
														village,
														alertLevelIcon(village.level),
														false);
							}
						}
					}
			}
	};

	/*const test = (districtsData) => {
		console.log("run useMemo",districtsData);
	}
	if(districtsData.length){
		useMemo(() => test(districtsData),districtsData);
	}*/

	return (
		<>
			<div id='map' className='MapGis-map'></div>
			{districtsData.length && !map && createMap()}
			{districtsData.length && clearMap()}
			{districtsData.length && addMarkers(districtsData)}
			{districtsData.length && setSelectedPin(selectedIndex)}
		</>
	);
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapGis);


//продумать тройной перебор(обощить)
//оптимизировать с useMemo
