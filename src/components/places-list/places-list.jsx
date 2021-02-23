import React, {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import PropTypes from 'prop-types';
import {CardTypes} from '../../const';
import {offerPropType} from '../../prop-types';

import cn from 'classnames';

const PlacesList = (props) => {
  const {offers, cardType = CardTypes.MAIN, onMouseEnter, onMouseLeave} = props;


  return (
    <div className={cn(
      {
        'places__list': true,
        'cities__places-list tabs__content': cardType === CardTypes.MAIN,
        'near-places__list': cardType === CardTypes.NEARBY,
        'favorites__places': cardType === CardTypes.FAVORITES
      }
    )}>

      {offers.map((offer) => (
        <PlaceCard
        key={offer.id}
        offer={offer}
        cardType={cardType}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
