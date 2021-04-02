import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchOffers} from '../../store/api-actions';
import Main from '../main/main';
import PageNotFound from '../page-not-found/page-not-found';
import Favorites from '../favorites/favorites';
import SignInScreen from '../sign-in/sign-in-screen';
import OfferScreenContainer from '../offer/offer-screen-container';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';
import {getDataLoadedStatus} from '../../store/main/selector';

import {AppRoutes} from '../../const';

const App = (props) => {
  const {isDataLoaded, onLoadOffersData} = props;

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadOffersData();
    }
  }, [isDataLoaded]);

  return (
    !isDataLoaded ?
      <Spinner/>
      :
      <Switch>
        <Route exact path={AppRoutes.MAIN}>
          <Main/>
        </Route>
        <Route exact path={AppRoutes.LOGIN}>
          <SignInScreen/>
        </Route>
        <Route exact path={AppRoutes.OFFER}>
          <OfferScreenContainer/>
        </Route>
        <PrivateRoute exact path={AppRoutes.FAVORITES} render={() => <Favorites/>}/>
        <Route>
          <PageNotFound/>
        </Route>
      </Switch>
  );
};

App.propTypes = {
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
