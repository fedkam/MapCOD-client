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
              "name":"Алеутский район",
              "items":[
                {
                  "id":2,
                  "name":"с. Никольское",
                  "items":[
                    {
                      "id": 3,
                      "name": "ул. 50 лет Октября, 32",
                      "level": "KSEON",
                      "latitude": 55.196937,
                      "longitude": 165.995093
                    },
                    {
                      "id": 4,
                      "name": "ул. 50 лет Октября, 13",
                      "level": "KSEON",
                      "latitude": 55.2,
                      "longitude": 166.0
                    }
                  ]
                }
              ]
            }
          ];
    console.log("get TEST data = ", response);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error("Something bad happened"));
        } else {
          resolve(response);
        }
      }, 3000);
    });
  };
}
