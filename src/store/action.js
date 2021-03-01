export const ActionType = {
  CHANGE_CITY: `common/changeCity`,
  SET_CITY_OFFERS: `common/setCityOffers`,
  CHANGE_SORTING: `common/changeSorting`
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
  })
};
