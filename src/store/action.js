export const ActionType = {
  CHANGE_CITY: `common/changeCity`,
  SET_CITY_OFFERS: `common/setCityOffers`,
  CHANGE_SORTING: `common/changeSorting`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `common/redirectToRoute`,
  LOAD_OFFERS: `data/loadOffers`,
  SET_AUTH_INFO: `user/login`,
  CLEAR_AUTH_INFO: `user/logout`,
  // ACTIVE_PIN: `ACTIVE_PIN`,
  // RESET_ACTIVE_PIN: `RESET_ACTIVE_PIN`
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  setCityOffers: () => ({
    type: ActionType.SET_CITY_OFFERS
  }),
  changeSorting: (sorting) => ({
    type: ActionType.CHANGE_SORTING,
    payload: sorting
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  }),

  setAuthInfo: (info) => ({
    type: ActionType.SET_AUTH_INFO,
    payload: info
  }),

  clearAuthInfo: () => ({
    type: ActionType.CLEAR_AUTH_INFO
  }),
  // changeActivePin: (activePin) => ({
  //   type: ActionType.ACTIVE_PIN,
  //   payload: activePin,
  // }),
  // resetActivePin: () => ({
  //   type: ActionType.RESET_ACTIVE_PIN,
  // }),

};
