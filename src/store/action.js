export const ActionType = {
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  SET_AUTH_INFO: `user/login`,
  CHANGE_CITY: `main/changeCity`,
  CHANGE_SORTING: `main/changeSorting`,
  LOAD_OFFERS: `data/loadOffers`,
  LOAD_OFFER: `offer/loadDetails`,
  LOAD_REVIEWS: `offer/loadReviews`,
  LOAD_NEARBY: `offer/loadNearby`,
  OFFER_NOT_FOUND: `offer/notFound`,
  RESET_OFFER_STATE: `offer/resetState`,
  ADD_FAVORITE: `data/addFavorite`,
  REMOVE_FAVORITE: `data/removeFavorite`,
  LOAD_FAVORITES: `data/loadFavorites`,
  RESET_FAVORITES: `data/resetFavorites`,
  REDIRECT_TO_ROUTE: `middlewares/redirectToRoute`
};

export const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  setAuthInfo: (info) => ({
    type: ActionType.SET_AUTH_INFO,
    payload: info
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),

  loadOfferById: (offer) => ({
    type: ActionType.LOAD_OFFER,
    payload: offer,
  }),

  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  }),

  loadNearby: (offers) => ({
    type: ActionType.LOAD_NEARBY,
    payload: offers
  }),

  loadFavorites: (offers) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: offers,
  }),

  offerNotFound: () => ({
    type: ActionType.OFFER_NOT_FOUND
  }),

  resetOfferState: () => ({
    type: ActionType.RESET_OFFER_STATE
  }),

  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  changeSorting: (sorting) => ({
    type: ActionType.CHANGE_SORTING,
    payload: sorting
  }),

  addFavorite: (offer) => ({
    type: ActionType.ADD_FAVORITE,
    payload: offer
  }),

  removeFavorite: (offer) => ({
    type: ActionType.REMOVE_FAVORITE,
    payload: offer
  }),

  resetFavorites: () => ({
    type: ActionType.RESET_FAVORITES,
  }),

  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  })
};
