
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
            ],
          },
          {
            id:722,
            name:"Елизовский район",
          }
  ]
};

const rows = [
            {
            id:30201,
            name:"Алеутский район",
            items:[ 
              { 
                id:30201000001,
                name:"A"
              },
            ],
          },
          {
            id:722,
            name:"Елизовский район",
          }
        ];

export default function data(state = rows, action){
//export default function data(state = {rows:{{id:30201, name:"Алеутский район"},{id:30201, name:"Алеутский район"}}}, action){
  console.log('action= ', action);
  if (action.type === 'INIT_DATA') {
    return [
      ...state,
      action.rows.rows,
    ];
  }
  return state;
};