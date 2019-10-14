
const initialStateStreet = {
  selectedIndex: undefined,
  latitude: undefined,
  longitude: undefined,
};

export default function selectedStreet(state = initialStateStreet, action){
  if (action.type === 'ADD_SELECTED_STREET') {
    return {
      ...state,
      selectedIndex: action.addselectedstreet,
    };
  }
  return state;
};
