import React from 'react';
import PropTypes from 'prop-types';
import Main from "../main/main";
import Login from "../login/login";
import PageNotFound from "../page-not-found/page-not-found";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {BrowserRouter, Route, Switch} from "react-router-dom";

const App = ({adCount, cities}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main adCount={adCount} cities={cities} />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>
        <Route path="/offer/:id?"exact>
          <Offer />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  adCount: PropTypes.number.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string)
};

export default App;
