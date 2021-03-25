import {ActionCreator} from './action';
import {AppRoutes, APIRoutes, AuthorizationStatus} from '../const';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.OFFERS)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGIN)
    .then(({data}) => dispatch(ActionCreator.setAuthInfo(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.LOGIN, {email, password})
    .then(({data}) => dispatch(ActionCreator.setAuthInfo(data)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoutes.MAIN)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGOUT)
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      dispatch(ActionCreator.setAuthInfo({}));
      dispatch(ActionCreator.resetFavorites());
    })
    .catch(() => {})
);
