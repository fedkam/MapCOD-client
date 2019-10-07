export default class DataService {

  getTestDistrictData() {
    console.log("getData()");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          reject(new Error("Something bad happened"));
        } else {
          resolve(this.datas);
        }
      }, 3000);
    });
  };

  getDistrictData(){
    fetch('http://localhost:9000/transferData')
      .then(res => res.json())
      .then(res => {
        /*res.rowsData.map((district) => {
         console.log("componentDidMount()/dis=" + district.name);
         this.props.onAddRow(district);
        });*/
        this.props.onAddAllDistricts(res.rowsData);
      })
      .catch(err => err);
  };

  /*let districtsData = {
            {
              id:1,
              name:"Алеутский район",
              items:[
                {
                  id:1.1,
                  name:"село"
                },
              ],
            },
            {
              id:2,
              name:"Быстринский район",
              items:[
                {
                  id:2.1,
                  name:"село"
                },
              ],
            },
            {
              id:3,
              name:"Елизовский район",
              items:[
                {
                  id:3.1,
                  name:"село"
                },
              ],
            },
            {
              id:4,
              name:"Карагинский район",
              items:[
                {
                  id:4.1,
                  name:"село"
                },
              ],
            },
            {
              id:4,
              name:"Мильковский район",
              items:[
                {
                  id:4.1,
                  name:"село"
                },
              ],
            },
            {
              id:4,
              name:"Олюторский район",
              items:[
                {
                  id:4.1,
                  name:"село"
                },
              ],
            },
            {
              id:4,
              name:"Пенжинский район",
              items:[
                {
                  id:4.1,
                  name:"село"
                },
              ],
            },
            {
              id:4,
              name:"Соболевский район",
              items:[
                {
                  id:4.1,
                  name:"село"
                },
              ],
            },
            {
              id:4,
              name:"Тигильский район",
              items:[
                {
                  id:4.1,
                  name:"село"
                },
              ],
            },
            {
              id:4,
              name:"Усть-Большерецкий район",
              items:[
                {
                  id:4.1,
                  name:"село"
                },
              ],
            },
            {
              id:4,
              name:"Усть-Камчатский район",
              items:[
                {
                  id:4.1,
                  name:"село"
                },
              ],
            },
  };*/
}
