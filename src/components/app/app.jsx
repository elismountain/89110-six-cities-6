import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {reviewPropType} from '../../prop-types';
import {fetchOffers} from '../../store/api-actions';
import Main from "../main/main";
import Login from "../login/login";
import PageNotFound from "../page-not-found/page-not-found";
import Favorites from "../favorites/favorites";
import OfferScreenContainer from '../offer-screen/offer-screen-container';
import {Router, Route, Switch} from "react-router-dom";
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';
import browserHistory from '../../browser-history';
import {getDataLoadedStatus} from '../../store/main/selector';

import {AppRoutes} from '../../const';

const App = (props) => {
  const {reviews, isDataLoaded, onLoadOffersData} = props;

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadOffersData();
    }
  }, [isDataLoaded]);

  return (
    !isDataLoaded ?
      <Spinner/>
      :
      <Router history={browserHistory}>
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
      </Router>
  );
};

App.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropType),
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadOffersData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDataLoaded: getDataLoadedStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadOffersData() {
    dispatch(fetchOffers());
  }
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
