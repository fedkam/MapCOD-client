import { combineReducers } from 'redux'


import data from './data';
import selectedStreet from './selected-street';

export default combineReducers({
	data,
	selectedStreet
})
