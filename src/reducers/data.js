import {ADD_ROW_DISTRICT, ADD_ALL_DISTRICTS} from '../actions';

const initialDataState = {
  rows: [
          /*{
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
          }*/
  ]
};

export default function data(state = initialDataState , action){
  if (action.type === ADD_ROW_DISTRICT) {
    //console.log('reducer data()= ', action);
    return {
      ...state,
      rows: [...state.rows, action.addrowdistrict]
    };
  }else if (action.type === ADD_ALL_DISTRICTS){
    return {
      ...state,
      rows: action.addalldistricts
    };
  }
  return state;
};
