import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { CreateSuperhero, SuperheroesList } from './components';

function App() {
  return (
    <div>
      <Router>
        <Link to={'/'}>Get All Superhero</Link>
        <br />
        <Link to={'/create'}>Add new Superhero</Link>

        <Switch>
          <Route path={'/create'}> <CreateSuperhero /> </Route>
          <Route path={'/'}> <SuperheroesList /> </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
