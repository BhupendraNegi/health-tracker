import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

import Readings from './Readings/Readings'
import Reading from './Reading/Reading'


const AppRouter = () => (
  <Router>
    <Routes>
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route exact path="/readings" component={Readings} />
            <Route exact path="/readings/:id" component={Reading} />
          </Switch>
        )}
      />
    </Routes>
  </Router>
);

export default AppRouter;
