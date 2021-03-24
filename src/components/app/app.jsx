import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropType} from '../../prop-types';
import Main from "../main/main";
import Login from "../login/login";
import PageNotFound from "../page-not-found/page-not-found";
import Favorites from "../favorites/favorites";
import OfferScreenContainer from '../offer-screen/offer-screen-container';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {AppRoutes} from '../../const';

const App = (props) => {
  const {reviews} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoutes.MAIN}>
          <Main />
        </Route>
        <Route exact path={AppRoutes.LOGIN}>
          <Login />
        </Route>
        <Route exact path={AppRoutes.FAVORITES}>
          <Favorites />
        </Route>
        <Route exact path={AppRoutes.OFFER}>
          <OfferScreenContainer reviews={reviews} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropType)
};

export default App;
