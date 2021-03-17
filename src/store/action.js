export const ActionType = {
  CHANGE_CITY: `common/changeCity`,
  SET_CITY_OFFERS: `common/setCityOffers`,
  CHANGE_SORTING: `common/changeSorting`,
  ACTIVE_PIN: `ACTIVE_PIN`,
  RESET_ACTIVE_PIN: `RESET_ACTIVE_PIN`
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
  changeActivePin: (activePin) => ({
    type: ActionType.ACTIVE_PIN,
    payload: activePin,
  }),
  resetActivePin: () => ({
    type: ActionType.RESET_ACTIVE_PIN,
  }),
};
