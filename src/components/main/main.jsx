import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import PlaceCard from '../place-card/place-card';
import PlacesList from '../places-list/places-list';
import LocationsList from '../locations-list/locations-list';
import OffersSorting from '../offers-sorting/offers-sorting';
import {offerPropType} from '../../prop-types';
import Map from '../map/map';

const Main = (props) => {
  const {currentCity, offers} = props;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${!offers.length ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList currentCity={currentCity}/>
          </section>
        </div>
        <div className="cities">
        {offers.length
          ? <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity}</b>
              <OffersSorting/>
              <PlacesList offers={offers}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
          : <div className="cities__places-container container cities__places-container--empty">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        }
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType)
};

export default Main;
