import {ActionType} from '../action';
import {adaptOfferData, adaptReviewsData} from '../../services/adapter';

const initialState = {
  offer: null,
  reviews: [],
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
    default:
      return state;
  }
};

export {reducer};
