import {ActionType} from './action';
import {Cities, SortingTypes, FIRST_CITY, AuthorizationStatus} from '../const';
// import {getCityOffers, getFavoriteOffers} from '../utils';
import {getCityOffers} from '../utils';
import {adaptOffersData} from '../services/adapter';

const initialState = {
  activeCity: Cities[FIRST_CITY],
  activePin: null,
  offers: [],
  // cityOffers: getCityOffers(offers),
  // favoriteOffers: getFavoriteOffers(offers),
  activeSorting: SortingTypes.POPULAR,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isOffersDataLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        activeCity: action.payload,
        cityOffers: getCityOffers(state.offers, state.activeCity),
      };

    case ActionType.ACTIVE_PIN:
      return {
        ...state,
        activePin: action.payload,
      };

    case ActionType.RESET_ACTIVE_PIN:
      return {
        ...state,
        activePin: null,
      };

    case ActionType.SET_CITY_OFFERS:
      return {
        ...state,
      };
    case ActionType.CHANGE_SORTING:
      return {
        ...state,
        activeSorting: action.payload
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: adaptOffersData(action.payload),
        isOffersDataLoaded: true
      };

    default:
      return state;
  }
};

export {reducer};
