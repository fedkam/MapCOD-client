// createMap.jsx

import DG from "2gis-maps";
import pinRasco from "../images/RascoMsoKseon/pinRasco.png";
import pinMso from "../images/RascoMsoKseon/pinMso.png";
import pin from "../images/RascoMsoKseon/pin.png";

var map;
var readFile ="DefaultValue";
var puthIcons = [pinRasco, pinMso, pin];
var RascoData;
var MsoData;

//read file local
  function readFileTxt(_input = "FileType") {
    let file = _input;
    let reader = new FileReader();
    
    
    reader.onload = function(e) {
        readFile = e.target.result;
        RascoData = JSON.parse(readFile).Rasco;
        MsoData = JSON.parse(readFile).Mso;

          console.log(reader.result);
          console.log(JSON.parse(readFile).Rasco);
          console.log(JSON.parse(readFile).Mso);
        
      createMap();
        addMarkers(RascoData, puthIcons[0]);
        addMarkers(MsoData, puthIcons[1]);
    };

    reader.onerror = function() {
        console.log("readFileTxt() ERROR:"+reader.error);
    };

    reader.readAsText(file);
  }


export function createMap(){
    if(!map){
      map = DG.map('map', {
          center: [58, 162],
          zoom: 5
          });
    }
  }


  function addMarker(_Latitude, _Longitude, _HeaderContent, _ContentVilladge, _ContentStreet, _Icon, _toReturn=true){
    let bindLabelAllArguments = "<h3>"+ _HeaderContent +" муниципальный район"+"</h3>"+ _ContentVilladge +", "+  _ContentStreet;
    if(_toReturn){
      return (DG.marker([ _Latitude, _Longitude], {icon: _Icon}).addTo(map).bindPopup(DG.popup().setLatLng([ _Latitude, _Longitude]).setHeaderContent( _HeaderContent).setContent( _ContentVilladge + "/n" + _ContentStreet)).bindLabel(bindLabelAllArguments));
    }else{
      //просто добавить 
      DG.marker([ _Latitude, _Longitude], {icon: _Icon}).addTo(map).bindPopup(DG.popup().setLatLng([ _Latitude, _Longitude]).setHeaderContent( _HeaderContent).setContent( _ContentVilladge + "/n" + _ContentStreet)).bindLabel(bindLabelAllArguments);
    }
  }


  function addMarkers(_RascoData, _Icon){
    let _iconSize = 32;     //Размер Иконки
    let _iconPin = _iconSize/2; //точка позиционирования Иконки на карте по оси X
    let markerGroup = [];     //Для аккамулирования объектов Marker
    let groupForMap = [];     //Для добавления обработчика на markerGroup[]
    let myIconRasco;

    myIconRasco = DG.icon({
                    //Стиль иконки
                    iconUrl: _Icon,
                    iconSize: [_iconSize, _iconSize],
                    iconAnchor: [_iconPin,_iconSize] //позиционирование
                });

    for(var lvl1 in _RascoData){
      let marker;
          marker = addMarker(_RascoData[lvl1][0], _RascoData[lvl1][1], _RascoData[lvl1][2], _RascoData[lvl1][3], _RascoData[lvl1][4], myIconRasco, true)
          markerGroup.push(marker); //Аккумулирую объекты Marker в массив
        }

        groupForMap = DG.featureGroup(markerGroup).addTo(map).on('click', function(e) { map.setView([e.latlng.lat, e.latlng.lng], 8);}); //Создается группа + обработчик любой на элемент Гр.
  }


export function MainCreateMap(){
    createMap();
    //запрос и ответ от сервера
    fetch('http://localhost:9000/transferData')
    .then(res => res.json())
    .then(res => {
      RascoData = res.Rasco;
      MsoData = res.Mso;
      addMarkers(RascoData, puthIcons[0]);
      addMarkers(MsoData, puthIcons[1]);
      //console.log(RascoData, MsoData);
    })
    .catch(err => err);
  }