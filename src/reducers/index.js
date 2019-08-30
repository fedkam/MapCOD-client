import { combineReducers } from 'redux'


import data from './data';
import selectedStreet from './selectedStreet';

export default combineReducers({
	data,
	selectedStreet
})
