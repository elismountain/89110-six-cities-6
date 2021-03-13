import {ActionType} from './action';
import {Cities, SortingTypes} from '../const';
import {getCityOffers, getFavoriteOffers} from '../utils';
import offers from '../mocks/offers';

const initialState = {
  activeCity: Cities.PARIS,
  offers,
  cityOffers: getCityOffers(offers, Cities.PARIS),
  favoriteOffers: getFavoriteOffers(offers),
  activeSorting: SortingTypes.POPULAR
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        activeCity: action.payload,
        cityOffers: getCityOffers(state.offers, state.activeCity)
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
    default:
      return state;
  }
};

export {reducer};
