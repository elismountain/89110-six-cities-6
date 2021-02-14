import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropType, offerPropType} from '../../prop-types';
import Main from "../main/main";
import Login from "../login/login";
import PageNotFound from "../page-not-found/page-not-found";
import Favorites from "../favorites/favorites";
import Offer from "../offer/offer";
import {BrowserRouter, Route, Switch} from "react-router-dom";

const App = (props) => {
  const {currentCity, offers, reviews} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main currentCity={currentCity} offers={offers.filter((offer) => offer.city.name === currentCity)} />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/favorites" exact>
          <Favorites offers={offers.filter((offer) => offer.isFavorite)}/>
        </Route>
        <Route path="/offer/:id?"exact>
          <Offer offers={offers} reviews={reviews} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType),
  // reviews: PropTypes.arrayOf(reviewPropType)
};

export default App;
