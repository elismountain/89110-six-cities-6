export const Paths = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer/:id`
};

export const Cities = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`
};


export const CardTypes = {
  MAIN: `main`,
  FAVORITES: `favorites`,
  NEARBY: `nearby`
};

export const RATING = [
  {
    value: 5,
    title: `perfect`
  },
  {
    value: 4,
    title: `good`
  },
  {
    value: 3,
    title: `not bad`
  },
  {
    value: 2,
    title: `bad`
  },
  {
    value: 1,
    title: `terrible`
  }
];

export const OfferTypes = {
  APARTMENT: `Apartment`,
  ROOM: `Private room`,
  HOUSE: `House`,
  HOTEL: `Hotel`
};

export const SortingTypes = {
  POPULAR: `Popular`,
  PRICE_ASC: `Price: low to high`,
  PRICE_DESC: `Price: high to low`,
  RATING: `Top rated first`
};
