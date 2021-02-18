import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerPropType} from '../../prop-types';
import {cardTypes, OfferTypes} from '../../const';

const PlaceCard = (props) => {
  const {offer, type, onMouseEnter} = props;

  const handleMouseEnter = () => {
  onMouseEnter(offer);
};

const classModifier = {
  [cardTypes.MAIN]: `cities__`,
  [cardTypes.FAVORITES]: `favorites__`,
  [cardTypes.NEARBY]: `near-places__`
};

  return (
    <article className={`place-card ${classModifier[type]}place-card`} onMouseEnter={handleMouseEnter}>
      <div className={`${classModifier[type]}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img
          className="place-card__image"
          src={offer.previewImage}
          width={260}
          height={200}
          alt="Place image"
          />
        </Link>
      </div>
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
        <p className="place-card__type">{OfferTypes}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offerPropType,
  type: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func
};

export default PlaceCard;
