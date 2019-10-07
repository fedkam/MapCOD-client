export const ADD_ROW_DISTRICT = 'ADD_ROW_DISTRICT';
export const ADD_ALL_DISTRICTS = 'ADD_ALL_DISTRICTS';
export const ADD_SELECTED_STREET = 'ADD_SELECTED_STREET';

export const addRowDistrict = addRowDistrict => ({
	type: ADD_ROW_DISTRICT,
	addRowDistrict
});

export const addAllDistricts = addalldistricts => ({
	type: ADD_ALL_DISTRICTS,
	addalldistricts
});

export const addSelectedStreet = (addselectedstreet) => ({
	type: ADD_SELECTED_STREET,
	addselectedstreet
});



const fetchDistrictData = (districtDataService, dispatch) => {

	console.log('districtDataService', districtDataService)
}

export { fetchDistrictData };
