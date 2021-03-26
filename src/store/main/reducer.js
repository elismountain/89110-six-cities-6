import {ActionType} from '../action';
import {Cities, SortingTypes, AuthorizationStatus} from '../../const';
import {adaptOffersData} from '../../services/adapter';

const initialState = {
  offers: [],
  activeCity: Cities.PARIS,
  activeSorting: SortingTypes.POPULAR,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isOffersDataLoaded: false,
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
        isOffersDataLoaded: true
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };
    default:
      return state;
  }
};

export {reducer};
