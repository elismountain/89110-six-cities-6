import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';
import OffersSorting from '../offers-sorting/offers-sorting';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';
import {Cities, CardTypes} from '../../const';


const MainOffers = (props) => {
  const {activeCity, offers} = props;
  const [activeCard, setActiveCard] = useState(null);

  const handleCardMouseEnter = (selectedCard) => {
    setActiveCard(selectedCard);
  };

  const handleCardMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {activeCity}</b>
        <OffersSorting/>
        <PlacesList
          offers={offers}
          cardType={CardTypes.MAIN}
          onCardMouseEnter={handleCardMouseEnter}
          onCardMouseLeave={handleCardMouseLeave}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map city={activeCity} points={offers} activePoint={activeCard} className={`cities__map`}/>
        </section>
      </div>
    </div>
  );
};

MainOffers.propTypes = {
  activeCity: PropTypes.oneOf(Object.values(Cities)),
  offers: PropTypes.arrayOf(offerPropType)
};

export default MainOffers;
