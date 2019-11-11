export const FETCH_DISTRICT_DATA_REQUEST = 'FETCH_DISTRICT_DATA_REQUEST';
export const FETCH_DISTRICT_DATA_SUCCESS = 'FETCH_DISTRICT_DATA_SUCCESS';
export const FETCH_DISTRICT_DATA_FAILURE = 'FETCH_DISTRICT_DATA_FAILURE';
export const ADD_ROW_DISTRICT = 'ADD_ROW_DISTRICT';
export const ADD_SELECTED_STREET = 'ADD_SELECTED_STREET';

export const allDistrictDataRequested = () => ({
	type: FETCH_DISTRICT_DATA_REQUEST
});

export const allDistrictDataLoaded = addalldistricts => ({
	type: FETCH_DISTRICT_DATA_SUCCESS,
	addalldistricts
});

export const allDistrictDataError = error => ({
	type: FETCH_DISTRICT_DATA_FAILURE,
	error
});

export const addRowDistrict = addRowDistrict => ({
	type: ADD_ROW_DISTRICT,
	addRowDistrict
});

export const addSelectedStreet = (addselectedstreet) => ({
	type: ADD_SELECTED_STREET,
	addselectedstreet
});

const fetchDistrictData = (districtDataService, dispatch) => () => {
	dispatch(allDistrictDataRequested());
	//												____________Server
	districtDataService.getDistrictData_withAxios()
										 .then(res => dispatch(allDistrictDataLoaded(res)))
										 .catch(err => dispatch(allDistrictDataError(err)));
	//							 					____________LocalData
	// districtDataService.getTestDistrictData()
	// 									 .then(res => dispatch(allDistrictDataLoaded(res)))
  // 									 .catch(err => dispatch(allDistrictDataError(err)));
}

export { fetchDistrictData };
