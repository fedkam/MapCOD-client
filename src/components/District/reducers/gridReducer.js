
const gridInitialState = {
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
  ],
  columns: [
  	{ name: 'name', title: 'Территория' },
  ],
  tableColumnExtensions: [
    { columnName: 'name', width: 200, wordWrapEnabled: true  },
  ]
};

export default function gridReducer(state = gridInitialState, action){
  if (action.type === 'GRID_STATE_CHANGE') {
    return {
      ...state,
      [action.partialStateName]: action.partialStateValue,
    };
  }
  return state;
};