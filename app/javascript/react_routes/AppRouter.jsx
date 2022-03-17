import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

import Readings from '../components/Readings/Readings'
import EditReading from '../components/Readings/EditReading'
import NewReading from '../components/Readings/NewReading'
import Reading from '../components/Readings/Reading'

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/readings" element={<Readings />} />
      <Route path="/readings/new" element={<NewReading />} />
      <Route path="/readings/:id/edit" element={<EditReading />} />
      <Route path="/readings/:id" element={<Reading />} />
    </Routes>
  </Router>
);

export default AppRouter;
