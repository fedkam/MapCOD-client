import {ADD_DATA} from '../actions';

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
  if (action.type === ADD_DATA) {
    //console.log('reducer data()= ', action);
    return {
      ...state,
      rows: [...state.rows, action.adddata]
    };
  }
  return state;
};