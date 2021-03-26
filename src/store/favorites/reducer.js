import {ActionType} from '../action';
import {adaptOffersData, adaptOfferData} from '../../services/adapter';

const initialState = {
  offers: [],
  isDataLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITES:
      return {
        ...state,
        offers: adaptOffersData(action.payload),
        isDataLoaded: true
      };
    case ActionType.ADD_FAVORITE:
      return {
        ...state,
        offers: state.isDataLoaded ? [...state.offers, adaptOfferData(action.payload)] : []
      };
    case ActionType.REMOVE_FAVORITE:
      return {
        ...state,
        offers: state.offers.filter((offer) => offer.id !== action.payload.id)
      };
    case ActionType.RESET_FAVORITES:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export {reducer};
