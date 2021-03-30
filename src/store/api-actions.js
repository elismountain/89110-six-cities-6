import {ActionCreator} from './action';
import {AppRoutes, APIRoutes, AuthorizationStatus} from '../const';
import {ActionCreator as middlewareActionCreator} from './middlewares/action';

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setAuthInfo(data));
    })
    .catch(() => {})
);

export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setAuthInfo(data));
    })
    .then(() => dispatch(middlewareActionCreator.redirectToRoute(AppRoutes.MAIN)))
    .catch(() => {})
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

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.OFFERS)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
);

export const fetchOfferById = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadOfferById(data)))
    .catch(() => dispatch(ActionCreator.offerNotFound()))
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
    .catch(() => {})
);

export const fetchNearby = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}/nearby`)
    .then(({data}) => dispatch(ActionCreator.loadNearby(data)))
    .catch(() => {})
);

export const sendReview = ({id, review}) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, review)
    .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
);

export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.FAVORITES)
    .then(({data}) => dispatch(ActionCreator.loadFavorites(data)))
);

export const changeOfferStatus = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${status}`)
    .then(({data}) => {
      dispatch(ActionCreator[data[`is_favorite`] ? `addFavorite` : `removeFavorite`](data));
    })
);
