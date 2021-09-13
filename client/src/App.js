import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { CreateSuperhero, Superhero, SuperheroesList } from './components';

function App() {
  return (
    <div className={'App'}>
      <Router>
        <header>
          <Link to={'/'}>Get All Superhero</Link>
          <Link to={'/create'}>Add new Superhero</Link>
        </header>

        <Switch>
          <Route path={'/create'}> <CreateSuperhero /> </Route>
          <Route path={'/superhero/:id'} > <Superhero /> </Route>
          <Route path={'/'}> <SuperheroesList /> </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
