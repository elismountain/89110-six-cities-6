import React from 'react';
import {useParams} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import PropTypes from 'prop-types';
import {reviewPropType, offerPropType} from '../../prop-types';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../const';

import OfferScreen from './offer-screen';


const OfferScreenContainer = (props) => {
  const {offers, reviews, authStatus} = props;
  const {id} = useParams();

  const offer = offers.find((item) => item.id === +id);
  const offersNearby = [offers[1], offers[2], offers[3]];

  if (!offer) {
    return <Redirect to="/" />;
  }

  return <OfferScreen offer={offer} reviews={reviews} offersNearby={offersNearby} isAuthorized={authStatus === AuthorizationStatus.AUTH} />;
};

OfferScreenContainer.propTypes = {
  offers: PropTypes.arrayOf(offerPropType),
  reviews: PropTypes.arrayOf(reviewPropType),
  authStatus: PropTypes.oneOf(Object.values(AuthorizationStatus))
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  authStatus: state.authorizationStatus,
});

export {OfferScreenContainer};
export default connect(mapStateToProps, null)(OfferScreenContainer);
