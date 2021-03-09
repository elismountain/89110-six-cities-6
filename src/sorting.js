import {SortingTypes} from './const';

export const getCityOffers = (offers, city) => {
  return offers.filter((offer) => offer.city.name === city);
};

export const getFavoriteOffers = (offers) => {
  return offers.filter((offer) => offer.isFavorite);
};

export const sortOffers = (offers, sortingType) => {
  switch (sortingType) {
    case SortingTypes.PRICE_ASC:
      return [...offers].sort((a, b) => (a.price - b.price));
    case SortingTypes.PRICE_DESC:
      return [...offers].sort((a, b) => (b.price - a.price));
    case SortingTypes.RATING:
      return [...offers].sort((a, b) => (b.rating - a.rating));
    default:
      return [...offers];
  }
};
