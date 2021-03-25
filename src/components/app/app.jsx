import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropType} from '../../prop-types';
import Main from "../main/main";
import Login from "../login/login";
import PageNotFound from "../page-not-found/page-not-found";
import Favorites from "../favorites/favorites";
import OfferScreenContainer from '../offer-screen/offer-screen-container';
import {Router as BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';

import {AppRoutes} from '../../const';

const App = (props) => {
  const {reviews} = props;
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoutes.MAIN}>
          <Main />
        </Route>
        <Route exact path={AppRoutes.LOGIN}>
          <Login />
        </Route>
        <Route exact path={AppRoutes.OFFER}>
          <OfferScreenContainer reviews={reviews} />
        </Route>
        <PrivateRoute exact path={AppRoutes.FAVORITES} render={() => <Favorites />} />
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
