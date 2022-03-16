import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

import Readings from './Readings/Readings'
import Reading from './Readings/Reading'


const AppRouter = () => (
  <Router>
    <Routes>
      <Route exact path="/readings" element={<Readings />} />
      <Route exact path="/readings/:id" element={<Reading />} />
    </Routes>
  </Router>
);

export default AppRouter;
