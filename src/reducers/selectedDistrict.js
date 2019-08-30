
const initialStateDistrict = {
  selectedIndex: undefined,
};

export default function selectedDistrict(state = initialStateDistrict, action){
  if (action.type === 'ADD_SELECTED_DISTRICT') {
    return {
      ...state,
      selectedIndex: action.addselecteddistrict,
    };
  }
  return state;
};
