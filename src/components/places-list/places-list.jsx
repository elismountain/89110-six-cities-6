import React, {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import PropTypes from 'prop-types';
import {CardTypes} from '../../const';
import {offerPropType} from '../../prop-types';

const PlacesList = (props) => {
  const {offers, cardType = CardTypes.MAIN, onMouseEnter, onMouseLeave} = props;
  const [activeCard, setActiveCard] = useState({});

  const handleMouseEnter = (selectedCard) => {
    setActiveCard(selectedCard);
  };

  const handleMouseLeave = () => {
    setActiveCard({});
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
        key={offer.id}
        offer={offer}
        cardType={cardType}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType),
  cardType: PropTypes.oneOf(Object.values(CardTypes)),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func

};

export default  PlacesList;
