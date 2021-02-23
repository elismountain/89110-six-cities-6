import React from "react";
import {Redirect, useParams} from 'react-router-dom';
import Header from "../header/header";
import PropTypes from 'prop-types';
import ReviewForm from "../review-form/review-form";
import ReviewsList from "../reviews-list/reviews-list";
import PlacesList from "../places-list/places-list";
import Map from "../map/map";
import {reviewPropType, offerPropType} from '../../prop-types';
import cn from 'classnames';
import {CardTypes, OfferTypes} from '../../const';

const OfferScreen = (props) => {
  const {offers, offersNearby, reviews, isAuthorized} = props;
  const id = useParams();
  const isAutorised = true;

  const offer = offers.find((item) => item.id === +id);

  if (!offer) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.slice(0, 6).map((image, i) => (
                <div className="property__image-wrapper" key={`image${i}`}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className={`property__bookmark-button button ${offer.isFavorite ? `property__bookmark-button--active` : ``}`} type="button">
                  <svg
                    className="property__bookmark-icon"
                    width={31}
                    height={33}
                  >
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `80%`}} />
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
                  <li className="property__inside-item">Wi-Fi</li>
                  <li className="property__inside-item">Washing machine</li>
                  <li className="property__inside-item">Towels</li>
                  <li className="property__inside-item">Heating</li>
                  <li className="property__inside-item">Coffee machine</li>
                  <li className="property__inside-item">Baby seat</li>
                  <li className="property__inside-item">Kitchen</li>
                  <li className="property__inside-item">Dishwasher</li>
                  <li className="property__inside-item">Cabel TV</li>
                  <li className="property__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                {isAuthorized && <ReviewForm />}
              </section>
            </div>
          </div>
          <section className="property__map map" />
          <Map city={offer.city} points={offersNearby} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title"> Other places in the neighbourhood</h2>
            <PlacesList offers={offersNearby} cardType={CardTypes.NEARBY}/>
          </section>
        </div>
      </main>
    </div>
  );
};

OfferScreen.propTypes = {
  offers: PropTypes.arrayOf(offerPropType),
  offersNearby: PropTypes.arrayOf(offerPropType),
  reviews: PropTypes.arrayOf(reviewPropType),
  isAuthorized: PropTypes.bool
};

export default OfferScreen;
