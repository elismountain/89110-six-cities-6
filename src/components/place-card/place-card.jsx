import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerPropType} from '../../prop-types';
import {CardTypes, OfferTypes} from '../../const';

const PlaceCard = (props) => {
  const {offer, cardType, onMouseEnter, onMouseLeave} = props;
  const handleMouseEnter = () => {
    onMouseEnter(offer);
  };

  const classModifier = {
    [CardTypes.MAIN]: `cities__`,
    [CardTypes.FAVORITES]: `favorites__`,
    [CardTypes.NEARBY]: `near-places__`
  };

  return (
    <article className={`place-card ${classModifier[cardType]}place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={`${classModifier[cardType]}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={cardType === CardTypes.FAVORITES ? `150` : `260`} height={cardType === CardTypes.FAVORITES ? `110` : `200`} alt="Place image" />
        </Link>
      </ div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${offer.isFavorite ? `place-card__bookmark-button--active` : ``}`} type="button">
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `80%`}}/>
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
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func

};

PlaceCard.defaultProps = {
  onMouseEnter: () => {}
};

export default PlaceCard;
