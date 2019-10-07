import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.css';
import App from "./components/App";
import * as serviceWorker from './serviceWorker';
import { ServiceProvider } from "./components/service-context";
import DataService from "./services/data-services";

import store from './store';

const dataService = new DataService();

ReactDOM.render(
	<Provider store = {store}>
		<ServiceProvider value={dataService}>
			<Router>
				<App />
			</Router>
		</ServiceProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
