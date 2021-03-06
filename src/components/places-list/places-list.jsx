import React from 'react';
import PlaceCard from '../place-card/place-card';
import PropTypes from 'prop-types';
import {CardTypes} from '../../const';
import {offerPropType} from '../../prop-types';

import cn from 'classnames';

const PlacesList = (props) => {
  const {offers, cardType = CardTypes.MAIN, onCardMouseEnter, onCardMouseLeave} = props;

  return (
    <div className={cn(
        {
          'places__list': true,
          'cities__places-list tabs__content': cardType === CardTypes.MAIN,
          'near-places__list': cardType === CardTypes.NEARBY,
          'favorites__places': cardType === CardTypes.FAVORITES
        }
    )}>

      {offers.map((offer, index) => (
        <PlaceCard
          key={offer.id + index}
          offer={offer}
          cardType={cardType}
          onCardMouseEnter={onCardMouseEnter}
          onCardMouseLeave={onCardMouseLeave}
        />
      ))}
    </div>
  );
};

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType),
  cardType: PropTypes.oneOf(Object.values(CardTypes)),
  onCardMouseEnter: PropTypes.func,
  onCardMouseLeave: PropTypes.func
};

export default PlacesList;
