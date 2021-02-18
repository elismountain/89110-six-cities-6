import React, {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import PropTypes from 'prop-types';
import {cardTypes} from '../../const';
import {offerPropType} from '../../prop-types';

const PlacesList = (props) => {
  const {offers} = props;
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
        offer={offer.id}
        type={cardTypes.MAIN}
        isActive={activeCard.id ===offer.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType)
};

export default  PlacesList;
