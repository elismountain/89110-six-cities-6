import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerPropType} from '../../prop-types';
import {CardTypes, OfferTypes} from '../../const';
import BookmarkButton from '../bookmark-button/bookmark-button';
import {getStarsWidth} from '../../utils';
import cn from 'classnames';

const PlaceCard = (props) => {
  const {offer, cardType, onCardMouseEnter = () => {}, onCardMouseLeave = () => {}} = props;

  const handleCardMouseEnter = () => {
    onCardMouseEnter(offer);
  };

  const classModifier = {
    [CardTypes.MAIN]: `cities__`,
    [CardTypes.FAVORITES]: `favorites__`,
    [CardTypes.NEARBY]: `near-places__`
  };

  return (
    <article className={`place-card ${classModifier[cardType]}place-card`} onMouseEnter={handleCardMouseEnter} onMouseLeave={onCardMouseLeave}>

      {offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={`${classModifier[cardType]}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={cardType === CardTypes.FAVORITES ? `150` : `260`} height={cardType === CardTypes.FAVORITES ? `110` : `200`} alt="Place image" id={offer.id}/>
        </Link>
      </ div>

      <div className={cn(`place-card__info`, {'favorites__card-info': cardType === CardTypes.FAVORITES})}>

        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton classModifier={`place-card__`} offer={offer} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getStarsWidth(offer.rating)}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{OfferTypes[offer.type.toUpperCase()]}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offerPropType,
  cardType: PropTypes.oneOf(Object.values(CardTypes)),
  onCardMouseEnter: PropTypes.func,
  onCardMouseLeave: PropTypes.func
};

export default PlaceCard;
