import {ActionType} from '../action';
import {Cities, SortingTypes} from '../../const';
import {adaptOffersData} from '../../services/adapter';

const initialState = {
  offers: [],
  activeCity: Cities.PARIS,
  activeSorting: SortingTypes.POPULAR,
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        activeCity: action.payload
      };

    case ActionType.CHANGE_SORTING:
      return {
        ...state,
        activeSorting: action.payload
      };

    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: adaptOffersData(action.payload),
        isDataLoaded: true
      };
    case ActionType.ADD_FAVORITE:
    case ActionType.REMOVE_FAVORITE:
      return {
        ...state,
        offers: state.offers.map((offer) => {
          return {
            ...offer,
            isFavorite: offer.id === action.payload.id ? action.payload[`is_favorite`] : offer.isFavorite
          };
        }),
      };
    case ActionType.RESET_FAVORITES:
      return {
        ...state,
        offers: state.offers.map((offer) => ({...offer, isFavorite: false}))
      };
    default:
      return state;
  }
};

export {reducer};
