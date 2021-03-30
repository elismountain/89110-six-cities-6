import {NameSpace} from '../root-reducer';

const getByProp = (state) => (prop) => state[NameSpace.OFFER][prop];

export const getCurrentOffer = (state) => getByProp(state)(`offer`);
export const getReviews = (state) => getByProp(state)(`reviews`);
export const getNotFoundStatus = (state) => getByProp(state)(`offerNotFound`);

export const getNearbyOffers = (state) => {
  return state[NameSpace.MAIN].offers.filter((item) => state[NameSpace.OFFER].nearby.includes(item.id));
};
