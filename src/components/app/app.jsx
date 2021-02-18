import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropType, offerPropType} from '../../prop-types';
import Main from "../main/main";
import Login from "../login/login";
import PageNotFound from "../page-not-found/page-not-found";
import Favorites from "../favorites/favorites";
import OfferScreen from "../offer-screen/offer-screen";
import {BrowserRouter, Route, Switch} from "react-router-dom";

const App = (props) => {
  const {offers, reviews} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main offers={offers} />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/favorites" exact>
          <Favorites offers={offers.filter((offer) => offer.isFavorite)}/>
        </Route>
        <Route path="/offer/:id?"exact>
          <OfferScreen offers={offers} reviews={reviews} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(offerPropType),
  reviews: PropTypes.arrayOf(reviewPropType)
};

export default App;
