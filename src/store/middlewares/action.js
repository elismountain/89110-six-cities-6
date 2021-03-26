export const ActionType = {
  REDIRECT_TO_ROUTE: `middlewares/redirectToRoute`
};

export const ActionCreator = {
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  })
};
