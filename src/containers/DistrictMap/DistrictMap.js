import React, {useMemo} from 'react';
import DG from '2gis-maps';
import pinRasco from '../../images/pins/pinRasco.png';
import pinMso from '../../images/pins/pinMso.png';
import pinKseon from '../../images/pins/pinKseon.png';
import pinLso from '../../images/pins/pinLso.png';
import pinSelect from '../../images/pins/pinSelect.png';
let map; //-------------------------------------------------   <-- разобраться с этим


function DistrictMap(props){
		const districtsData = props.data.rows;
		const selectedIndex = props.selectedStreet.selectedIndex;

		//поиск слоя в объекте map
		const findLayerOnMapById = (id) => {
				let marker;
				map.eachLayer( (layer) => {
						if(layer.districtId === id){
							marker = layer;
						}
				});
				return marker;
		};

		//установка координат и масштаба на карте
		const setViewByCoordinates = (latitude=58, longitude=164, sizeMap=5) => {
				if(map.getZoom() > sizeMap && sizeMap!==5){
					sizeMap=map.getZoom();
				}
				map.setView([latitude, longitude], sizeMap);
		};

		//изменение иконки при выбранном маркере на карте
		const setIconSelectedPin = (layer) => {
				layer['defaultLevel']=layer.options.icon.options.level;
				layer.setIcon(createIcon('SELECT'));
				layer.setZIndexOffset(2000);
				layer.addTo(map);
		};

		//изменение на стандартую иконку маркера
		const setDefaultIconPin = () => {
				map.eachLayer( (layer) => {
						if(layer.defaultLevel){
							layer.setIcon(createIcon(layer.defaultLevel));
							layer.setZIndexOffset(1000);
							delete layer.defaultLevel;
						}
				});
		};

		//настроить||сбросить отображение и иконку для выделенного маркера
		const setSelectedPin = (selectedIndex) => {
				if(districtsData.length){
					let marker = findLayerOnMapById(selectedIndex);

					if(marker !== undefined  &&  selectedIndex !== undefined){
						let  LatLng;
						marker = findLayerOnMapById(selectedIndex);
						LatLng = marker.getLatLng();
						setDefaultIconPin();
						setIconSelectedPin(marker);
						setViewByCoordinates(LatLng.lat, LatLng.lng, 7);
					}else{
						setViewByCoordinates();
						setDefaultIconPin();
						}
				}
		};

		//обработчик нажатия, обновление Store
		const handleClickStreet = (e) => {
				let marker = {};
				marker = findLayerOnMapById(e.target.districtId);

				if(!marker.defaultLevel){
					props.onAddSelectedStreet( e.target.districtId );
				}else{
					props.onAddSelectedStreet(undefined);
				}
		};

		const createIcon = (level) => {
				let iconSize = 32;     //Размер Иконки
				let iconPin = iconSize / 2; //точка позиционирования Иконки на карте по оси X
				let icon = {};

				//определение района для иконки мркера
				switch (level) {
					case 'RASCO':
						icon = pinRasco;
						break;
					case 'KSEON':
						icon = pinKseon;
						break;
					case 'MSO':
						icon = pinMso;
						break;
					case 'LSO':
						icon = pinLso;
						break;
					case 'SELECT':
						icon = pinSelect;
						break;
				}

				return(
							DG.icon({
									//Стиль иконки
									level:level,
									iconUrl: icon,
									iconSize: [iconSize, iconSize],
									iconAnchor: [iconPin, iconSize], //позиционирование
							})
				);
		};


		const createMap = (latitude=58, longitude=162, sizeMap=5) => {
				if(districtsData.length){
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
				}
			};

		// const clearMap = () => {
		// 		if(districtsData.length){
		// 			map.eachLayer( (layer) => {
		// 					if(layer.districtId){
		// 						layer.remove();
		// 					}
		// 			});
		// 		}
		// };

		const createMarker = (village, street, icon) => {
				let marker;
				marker = DG.marker([ street.latitude, street.longitude], {icon: icon})
										.on('click', (e) => handleClickStreet(e))
										.bindLabel('<h3>'+  village.name +'</h3>'+', '+  street.name);
				marker['districtId'] = street._id;
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
				if(districtsData.length){
					for(let district of districtsData){
								if(district['items']){
									for(let village of district.items){
										if(village['items']){
											for(let street of village.items){
													addMarker(village,
																		street,
																		createIcon(street.level),
																		false);
											}
										}else{  //здесь ПК итп
												addMarker(district,
																	village,
																	createIcon(village.level),
																	false);
										}
									}
								}
					}
				}
		};

		return (
				<>
					<div id='map' className='MapGis-map'/>
					{createMap()}
					{useMemo(() => addMarkers(districtsData), [districtsData])}
					{useMemo(() => setSelectedPin(selectedIndex), [selectedIndex])}
				</>
		);
};

export default DistrictMap;

//продумать тройной перебор(обощить)
//оптимизировать с useMemo
// ИЗБАВИТЬСЯ от проверки if(istrictsData.length )
