export const ADD_ROW_DISTRICT = 'ADD_ROW_DISTRICT';
export const ADD_ALL_DISTRICTS = 'ADD_ALL_DISTRICTS';
export const ADD_SELECTED_DISTRICT = 'ADD_SELECTED_DISTRICT';

export const addRowDistrict = addRowDistrict => ({
	type: ADD_ROW_DISTRICT,
	addRowDistrict
});

export const addAllDistricts = addalldistricts => ({
	type: ADD_ALL_DISTRICTS,
	addalldistricts
});

export const addSelectedDistrict = addselecteddistrict => ({
	type: ADD_SELECTED_DISTRICT,
	addselecteddistrict
});
