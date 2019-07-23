
const initialStateDistrict = {
  columns: [
  	{ name: 'name', title: 'Территория' },
  ],
  tableColumnExtensions: [
    { columnName: 'name', width: 200, wordWrapEnabled: true  },
  ]
};

export default function districtTable(state = initialStateDistrict, action){
  if (action.type === 'GRID_STATE_CHANGE') {
    return {
      ...state,
      [action.partialStateName]: action.partialStateValue,
    };
  }
  return state;
};