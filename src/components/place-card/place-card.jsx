import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerPropType} from '../../prop-types';
import {CardTypes, OfferTypes} from '../../const';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {getStarsWidth} from '../../utils';

const PlaceCard = (props) => {
  const {offer, cardType, setActivePin, resetActivePin} = props;

  const onMouseEnterHandler = () => {
    // getActiveCard(offer.id);
    setActivePin(offer.id);
  };

  const classModifier = {
    [CardTypes.MAIN]: `cities__`,
    [CardTypes.FAVORITES]: `favorites__`,
    [CardTypes.NEARBY]: `near-places__`
  };

  return (
    <article className={`place-card ${classModifier[cardType]}place-card`} onMouseEnter={onMouseEnterHandler} onMouseLeave={resetActivePin}>
      <div className={`${classModifier[cardType]}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={cardType === CardTypes.FAVORITES ? `150` : `260`} height={cardType === CardTypes.FAVORITES ? `110` : `200`} alt="Place image" id={offer.id}/>
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
  // getActiveCard: PropTypes.func.isRequired,
  setActivePin: PropTypes.func.isRequired,
  resetActivePin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setActivePin(pin) {
    dispatch(ActionCreator.changeActivePin(pin));
  },
  resetActivePin() {
    dispatch(ActionCreator.resetActivePin());
  },
});

export {PlaceCard};
export default connect(null, mapDispatchToProps)(PlaceCard);
