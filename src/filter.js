import offers from '../mocks/offers';

export const offersByCity = offers.reduce((acc, cur) => {
  acc[cur.city.name] = acc[cur.city.name] ? [...(acc[cur.city.name]), cur] : [cur];
  return acc;
}, {});
