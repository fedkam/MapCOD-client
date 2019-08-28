
const initialStateDistrict = {
  columns: [
  	{ name: 'name', title: 'Территория' },
  ],
  tableColumnExtensions: [
    { columnName: 'name', wordWrapEnabled: true  },
  ],
};

export default function selectedDistrict(state = initialStateDistrict, action){
  if (action.type === 'GRID_STATE_CHANGE') {
    return {
      ...state,
      [action.partialStateName]: action.partialStateValue,
    };
  }
  return state;
};
