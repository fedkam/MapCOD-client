
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

export default function data(state = initialDataState, action){
  if (action.type === 'INIT_DATA') {
    console.log('action= ', action);
    return {
      ...state,
      rows: [...state.rows, action.addrows]
    };
  }
  return state;
};