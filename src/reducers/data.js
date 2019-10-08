import {
  ADD_ROW_DISTRICT,
  FETCH_DISTRICT_DATA_REQUEST,
  FETCH_DISTRICT_DATA_SUCCESS,
  FETCH_DISTRICT_DATA_FAILURE
} from "../actions";

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
  ],
  isLoadingDistrictData: true,
  isErrorLoadingDistrictData: null
};

export default function data(state = initialDataState , action){

  switch(action.type){
    case FETCH_DISTRICT_DATA_REQUEST:
      return{
        ...state,
        isLoadingDistrictData: true,
        isErrorLoadingDistrictData: null
      };
    case FETCH_DISTRICT_DATA_SUCCESS:
      return{
        ...state,
        rows: action.addalldistricts,
        isLoadingDistrictData: false,
        isErrorLoadingDistrictData: null
      };
    case FETCH_DISTRICT_DATA_FAILURE:
      return{
        ...state,
        isLoadingDistrictData: false,
        isErrorLoadingDistrictData: action.error
      };
    case ADD_ROW_DISTRICT:
      return {
        ...state,
        rows: [...state.rows, action.addrowdistrict]
      };
    // case ADD_ALL_DISTRICTS:
    //   return {
    //     ...state,
    //     rows: action.addalldistricts
    //   };
    default:
      return state;
  }
  //
  // if (action.type === ADD_ROW_DISTRICT) {
  //   //console.log('reducer data()= ', action);
  //   return {
  //     ...state,
  //     rows: [...state.rows, action.addrowdistrict]
  //   };
  // }else if (action.type === ADD_ALL_DISTRICTS){
  //   return {
  //     ...state,
  //     rows: action.addalldistricts
  //   };
  //}

};
