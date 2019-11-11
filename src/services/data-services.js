import axios from 'axios';
let url = 'http://localhost:9000/transferData';

export default class DataService {

  getDistrictData_withFetch = async () => {
    let response = await fetch(url);
    let res = await response.json();
    return res.rowsData;
  };

  getDistrictData_withAxios = async () => {
     let response = await axios(url);
     let res = response.data;
     return res.rowsData;
  };

  getTestDistrictData() {
    let response = [
            {
              "id":1,
              "name":"Петропавловск-Камчатский",
              "items":[
  							{
  								"id": 2,
  								"name": "ул. Площадь Ленина, 1",
  								"level": "MSO",
  								"latitude": 53.022944,
  								"longitude": 158.647101
  							}
  						]
            },
            {
              "id":3,
              "name":"Красивые места",
              "items":[
                {
                  "id":4,
                  "name":"Вулканы",
                  "items":[
                    {
                      "id": 5,
                      "name": "Авачинский (2741 метр)",
                      "level": "KSEON",
                      "latitude": 53.25718,
                      "longitude": 158.83355
                    },
                    {
                      "id": 6,
                      "name": "Корякский (3456 метра)",
                      "level": "KSEON",
                      "latitude": 53.31011,
                      "longitude": 158.685092
                    }
                  ]
                },
                {
                  "id":7,
                  "name":"Скалы",
                  "items":[
                    {
                      "id": 8,
                      "name": "Три брата",
                      "level": "RASCO",
                      "latitude": 52.892898,
                      "longitude": 158.688376
                    }
                  ]
                }
              ]
            }
          ];
    console.log("get TEST data = ", response);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(response);
      }, 1000);
    });
  };
}
