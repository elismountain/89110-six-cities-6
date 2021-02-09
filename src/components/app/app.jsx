import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main';
import Login from '../login/login';
import {BrowserRouter, Route, Switch} from "react-router-dom";

const App = ({adCount, cities}) => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/">
        <Main adCount={adCount} cities={cities} />
      </Route>
      <Route path="/login" exact>
        <Login />
        </Route>
      <Route path="/favorites" exact>
        <Favorites />
      </Route>

      </Switch>
    </BrowserRouter>
  )
}

App.propTypes = {
  adCount: PropTypes.number.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string)
};

export default App;
