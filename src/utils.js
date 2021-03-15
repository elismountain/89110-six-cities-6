export const getCityOffers = (offers, city) => {
  return offers.filter((offer) => offer.city.name === city);
};

export const getFavoriteOffers = (offers) => {
  return offers.filter((offer) => offer.isFavorite);
};


export const getStarsWidth = (rating) => {
  return `${Math.round(rating) * 20}%`;
};
