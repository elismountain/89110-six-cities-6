import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {reviewPropType, offerPropType} from '../../prop-types';
import {useLocation} from 'react-router-dom';
import Header from "../header/header";
import PlacesList from "../places-list/places-list";
import ReviewForm from "../reviews/review-form";
import ReviewsList from "../reviews/reviews-list";
import Map from "../map/map";
import {CardTypes} from '../../const';
import OfferGallery from '../offer/offer-gallery';
import OfferDetails from '../offer/offer-details';

const OfferScreen = (props) => {
  const {offer, reviews, offersNearby, isAuthorized} = props;
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <OfferGallery images={offer.images}/>

          <OfferDetails offer={offer}>
            <section className="property__reviews reviews">
              <ReviewsList reviews={reviews} />
              {isAuthorized && <ReviewForm id={offer.id} />}
            </section>
          </OfferDetails>

          <section className="property__map map">
            <Map city={offer.city.name} points={offersNearby} />
          </section>
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
  offer: offerPropType,
  offersNearby: PropTypes.arrayOf(offerPropType),
  reviews: PropTypes.arrayOf(reviewPropType),
  isAuthorized: PropTypes.bool
};


export default OfferScreen;
