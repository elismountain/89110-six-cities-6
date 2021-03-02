import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import PlacesList from '../places-list/places-list';
import OffersSorting from '../offers-sorting/offers-sorting';
import CitiesList from '../cities-list/cities-list';
import {offerPropType} from '../../prop-types';
import Map from '../map/map';
import {Cities} from '../../const';

const Main = (props) => {
  const {offers, activeCity} = props;
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${!filteredOffers.length ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length
            ? <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
                <OffersSorting/>
                <PlacesList offers={filteredOffers}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={filteredOffers[0].city} points={filteredOffers} activeMarker={activeCity}/>
                </ section>
              </div>
            </div>
            :
            <div className="cities__places-container container cities__places-container--empty">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
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
  offers: PropTypes.arrayOf(offerPropType),
  activeCity: PropTypes.oneOf(Object.values(Cities))
};


export default Main;
