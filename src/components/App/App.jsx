import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { HomePage } from '../pages';

const App = () => {
  return(
        <main role="main">
          <Switch>
            <Route path="/" component={HomePage} exact />
          </Switch>
        </main>
  );
}

export default App;
