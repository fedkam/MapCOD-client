
const initialDataState = {
  rows: [
          {
            id:30201,
            name:"Алеутский район",
            items:[ 
              { 
                id:30201000001,
                name:"A"
              },
              { 
                id:30201000002,
                name:"B"
              },
              { 
                id:30201000001,
                name:"C"
              },
              { 
                id:30201000002,
                name:"D"
              },
            ],
          },
          {
            id:722,
            name:"Елизовский район",
          }
  ]
};

export default function data(state = initialDataState, action){
  return state;
};