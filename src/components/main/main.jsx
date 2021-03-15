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
import cn from 'classnames';

const Main = (props) => {
  const {cityOffers, activeCity} = props;
  const cityLocation = cityOffers.length ? cityOffers[0].city.location : {};

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
      <main className={cn(`page__main page__main--index`, {'page__main--index-empty': !cityOffers.length})}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {cityOffers.length
            ? <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {activeCity}</b>
                <OffersSorting/>
                <PlacesList
                  offers={cityOffers}
                  cardType={CardTypes.MAIN}
                  onCardMouseEnter={handleCardMouseEnter}
                  onCardMouseLeave={handleCardMouseLeave}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={cityLocation} points={cityOffers} activeMarker={activeCard}/>
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
  cityOffers: PropTypes.arrayOf(offerPropType),
  activeCity: PropTypes.oneOf(Object.values(Cities))
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  cityOffers: sortOffers(state.cityOffers, state.activeSorting)
});

export {Main};
export default connect(mapStateToProps)(Main);
