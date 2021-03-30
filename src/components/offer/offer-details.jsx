import React from 'react';

import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';

import BookmarkButton from '../bookmark-button/bookmark-button';

import {OfferTypes} from '../../const';
import {getStarsWidth} from '../../utils';

import cn from 'classnames';


const OfferDetails = (props) => {
  const {offer, children} = props;

  return (
    <div className="property__container container">
      <div className="property__wrapper">
        {offer.isPremium &&
          <div className="property__mark">
            <span>Premium</span>
          </div>
        }
        <div className="property__name-wrapper">
          <h1 className="property__name">{offer.title}</h1>
          <BookmarkButton classModifier={`property__`} offer={offer} width={`31`} height={`33`} />
        </div>
        <div className="property__rating rating">
          <div className="property__stars rating__stars">
            <span style={{width: `${getStarsWidth(offer.rating)}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="property__rating-value rating__value">{offer.value}</span>
        </div>
        <ul className="property__features">
          <li className="property__feature property__feature--entire">{OfferTypes[offer.type.toUpperCase()]}</li>
          <li className="property__feature property__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
          <li className="property__feature property__feature--adults">Max {offer.maxAdults} adults</li>
        </ul>
        <div className="property__price">
          <b className="property__price-value">&euro;{offer.price}</b>
          <span className="property__price-text">&nbsp;night</span>
        </div>
        <div className="property__inside">
          <h2 className="property__inside-title">What&apos;s inside</h2>
          <ul className="property__inside-list">
            {offer.goods.map((item, i) => (
              <li className="property__inside-item" key={`item${i}`}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="property__host">
          <h2 className="property__host-title">Meet the host</h2>
          <div className="property__host-user user">
            <div className={cn(`property__avatar-wrapper user__avatar-wrapper`, {'property__avatar-wrapper--pro': offer.host.isPro})}>
              <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                alt="Host avatar" />
            </div>
            <span className="property__user-name">{offer.host.name}</span>
          </div>
          <div className="property__description">
            <p className="property__text">{offer.description}</p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

OfferDetails.propTypes = {
  offer: offerPropType,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default OfferDetails;
