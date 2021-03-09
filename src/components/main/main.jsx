import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header';
import PlacesList from '../places-list/places-list';
import OffersSorting from '../offers-sorting/offers-sorting';
import CitiesList from '../cities-list/cities-list';
import {offerPropType} from '../../prop-types';
import Map from '../map/map';
import {Cities, CardTypes} from '../../const';
import {sortOffers} from '../../sorting';
import MainEmpty from '../main/main-empty';

const Main = (props) => {
  const {offers, activeCity} = props;
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);

  const [activeCard, setActiveCard] = useState(null);

  const handleCardMouseEnter = (selectedCard) => {
    setActiveCard(selectedCard);
  };

  const handleCardMouseLeave = () => {
    setActiveCard(null);
  };

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
                <PlacesList
                  offers={filteredOffers}
                  cardType={CardTypes.MAIN}
                  onCardMouseEnter={handleCardMouseEnter}
                  onCardMouseLeave={handleCardMouseLeave}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={filteredOffers[0].city} points={filteredOffers} activeMarker={activeCard}/>
                </ section>
              </div>
            </div>
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

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  offers: sortOffers(state.offers, state.activeSorting)
});

export {Main};
export default connect(mapStateToProps)(Main);
