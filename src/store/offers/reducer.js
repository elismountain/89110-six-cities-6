import {ActionType} from '../action';
import {adaptOfferData, adaptReviewsData} from '../../services/adapter';

const initialState = {
  offer: null,
  reviews: [],
  nearby: [],
  offerNotFound: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFER:
      return {
        ...state,
        offer: adaptOfferData(action.payload),
        offerNotFound: false
      };
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: adaptReviewsData(action.payload)
      };
    case ActionType.LOAD_NEARBY:
      return {
        ...state,
        nearby: action.payload.map((offer) => offer.id)
      };

    case ActionType.OFFER_NOT_FOUND:
      return {
        ...state,
        offerNotFound: true
      };
    case ActionType.RESET_OFFER_STATE:
      return {
        ...state,
        ...initialState
      };
    case ActionType.ADD_FAVORITE:
    case ActionType.REMOVE_FAVORITE:
      return {
        ...state,
        offer: state.offer ? {...state.offer, isFavorite: action.payload[`is_favorite`]} : null
      };
    case ActionType.RESET_FAVORITES:
      return {
        ...state,
        offer: state.offer ? {...state.offer, isFavorite: false} : null
      };
    default:
      return state;
  }
};

export {reducer};
