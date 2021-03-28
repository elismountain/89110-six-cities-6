export const AppRoutes = {
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

export const Coordinates = {
  [Cities.PARIS]: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  [Cities.COLOGNE]: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  [Cities.BRUSSELS]: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  [Cities.AMSTERDAM]: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
  [Cities.HAMBURG]: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  },
  [Cities.DUSSELDORF]: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  }
};

export const APIRoutes = {
  OFFERS: `/hotels`,
  OFFER: `/hotels/:id`,
  OFFERS_NEARBY: `/hotels/:hotel_id/nearby`,
  FAVORITES: `/favorite`,
  REVIEWS: `/comments/:hotel_id`,
  LOGIN: `/login`,
  LOGOUT: `/logout`
};

export const ResponseType = {
  SUCCESS: `SUCCESS`,
  ERROR: `ERROR`,
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};
