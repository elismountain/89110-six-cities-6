import {SortingTypes} from '../../const';
import {NameSpace} from '../root-reducer';
import {createSelector} from 'reselect';

const getByProp = (state) => (prop) => state[NameSpace.MAIN][prop];


export const getOffers = (state) => getByProp(state)(`offers`);
export const getActiveCity = (state) => getByProp(state)(`activeCity`);
export const getActiveSorting = (state) => getByProp(state)(`activeSorting`);
export const getDataLoadedStatus = (state) => getByProp(state)(`isDataLoaded`);


export const getSortedCityOffers = createSelector(
    [getOffers, getActiveCity, getActiveSorting],
    (offers, city, sorting) => {
      const cityOffers = offers.filter((offer) => offer.city.name === city);

      switch (sorting) {
        case SortingTypes.PRICE_ASC:
          return [...cityOffers].sort((a, b) => (a.price - b.price));
        case SortingTypes.PRICE_DESC:
          return [...cityOffers].sort((a, b) => (b.price - a.price));
        case SortingTypes.RATING:
          return [...cityOffers].sort((a, b) => (b.rating - a.rating));
        default:
          return [...cityOffers];
      }
    }
);
