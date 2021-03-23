import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import {offerPropType} from '../../prop-types';
import MainOffers from '../main/main-offers';

import {Cities} from '../../const';
import {sortOffers} from '../../sorting';
import MainEmpty from '../main/main-empty';
import cn from 'classnames';

const Main = (props) => {
  const {offers, activeCity} = props;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={cn(`page__main page__main--index`, {'page__main--index-empty': !offers.length})}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {offers.length ?
            <MainOffers offers={offers} activeCity={activeCity} />
            :
            <MainEmpty activeCity={activeCity} />
          }
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(offerPropType),
  activeCity: PropTypes.oneOf(Object.values(Cities))
};

const filteredOffers = (offers, activeCity) => {
  return offers.filter((offer) => offer.city.name === activeCity);
};

const mapStateToProps = (state) => {
  let offers = filteredOffers(state.offers, state.activeCity);
  offers = sortOffers(offers, state.activeSorting);
  return {
    activeCity: state.activeCity,
    offers: offers,
  };
};

export {Main};
export default connect(mapStateToProps)(Main);
