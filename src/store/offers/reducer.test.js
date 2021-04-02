import {reducer} from './reducer';
import {ActionType} from '../action';
import {offerRaw, offerAdapted, reviewsRaw, nearbyRaw, review, reviewResponse} from './test-mocks';

import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {fetchOfferById, fetchReviews, fetchNearby, sendReview, changeOfferStatus} from '../api-actions';
import {APIRoutes, FavoriteStatus} from '../../const';

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {}))
      .toEqual({
        offer: null,
        reviews: [],
        nearby: [],
        offerNotFound: false
      });
  });

  it(`Reducer reset to initial state`, () => {
    const state = {
      offer: {id: 1},
      reviews: [{id: 100}],
      nearby: [{id: 2}, {id: 3}],
      offerNotFound: false
    };

    const resetAction = {
      type: ActionType.RESET_OFFER_STATE
    };

    expect(reducer(state, resetAction))
      .toEqual({
        offer: null,
        reviews: [],
        nearby: [],
        offerNotFound: false
      });
  });

  it(`Reducer should mark offer as favorite`, () => {
    const state = {
      offer: {...offerAdapted, isFavorite: false},
      reviews: [],
      nearby: [{id: 2}, {id: 3}],
      offerNotFound: false
    };

    const addFavoriteAction = {
      type: ActionType.ADD_FAVORITE,
      payload: {...offerRaw, "is_favorite": true},
    };

    expect(reducer(state, addFavoriteAction))
      .toEqual({
        offer: {...offerAdapted, isFavorite: true},
        reviews: [],
        nearby: [{id: 2}, {id: 3}],
        offerNotFound: false
      });
  });

  it(`Reducer should unmark offer as favorite`, () => {
    const state = {
      offer: {...offerAdapted, isFavorite: true},
      reviews: [],
      nearby: [{id: 2}, {id: 3}],
      offerNotFound: false
    };

    const removeFavoriteAction = {
      type: ActionType.REMOVE_FAVORITE,
      payload: {...offerRaw, "is_favorite": false},
    };

    expect(reducer(state, removeFavoriteAction))
      .toEqual({
        offer: {...offerAdapted, isFavorite: false},
        reviews: [],
        nearby: [{id: 2}, {id: 3}],
        offerNotFound: false
      });
  });

  it(`Reducer should unmark offer when all favorites reset`, () => {
    const state = {
      offer: {...offerAdapted, isFavorite: true},
      reviews: [],
      nearby: [{id: 2}, {id: 3}],
      offerNotFound: false
    };

    const resetFavoritesAction = {
      type: ActionType.RESET_FAVORITES
    };

    expect(reducer(state, resetFavoritesAction))
      .toEqual({
        offer: {...offerAdapted, isFavorite: false},
        reviews: [],
        nearby: [{id: 2}, {id: 3}],
        offerNotFound: false
      });
  });

  it(`Reducer should not update null offer when all favorites reset`, () => {
    const state = {
      offer: null,
      reviews: [],
      nearby: [],
      offerNotFound: false
    };

    const resetFavoritesAction = {
      type: ActionType.RESET_FAVORITES
    };

    expect(reducer(state, resetFavoritesAction))
      .toEqual({
        offer: null,
        reviews: [],
        nearby: [],
        offerNotFound: false
      });
  });
});


describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to not existing offer`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = `0`;
    const offerDetailsLoader = fetchOfferById(id);

    apiMock
      .onGet(APIRoutes.OFFER.replace(`:id`, id))
      .reply(404);

    return offerDetailsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.OFFER_NOT_FOUND
        });
      });
  });

  it(`Should make a correct API call to fetch offer by Id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = `1`;
    const offerDetailsLoader = fetchOfferById(id);

    apiMock
      .onGet(APIRoutes.OFFER.replace(`:id`, id))
      .reply(200, offerRaw);

    return offerDetailsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: offerRaw
        });
      });
  });

  it(`Should make a correct API call to fetch reviews`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = `1`;
    const reviewsLoader = fetchReviews(1);

    apiMock
      .onGet(APIRoutes.REVIEWS.replace(`:id`, id))
      .reply(200, reviewsRaw);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: reviewsRaw
        });
      });
  });

  it(`Should make a correct API call to fetch nearby offers`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = `1`;
    const nearbyOffersLoader = fetchNearby(id);

    apiMock
      .onGet(APIRoutes.OFFERS_NEARBY.replace(`:id`, id))
      .reply(200, nearbyRaw);

    return nearbyOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEARBY,
          payload: nearbyRaw
        });
      });
  });

  it(`Should make a correct API call to send review`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = `1`;
    const sendReviewLoader = sendReview({id, review});

    apiMock
      .onPost(APIRoutes.REVIEWS.replace(`:id`, id))
      .reply(200, [...reviewsRaw, reviewResponse]);

    return sendReviewLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [...reviewsRaw, reviewResponse]
        });
      });
  });

  it(`Should make a correct API call mark offer as favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = `1`;
    const status = FavoriteStatus.ADD;
    const changeStatusLoader = changeOfferStatus(id, status);

    apiMock
      .onPost(APIRoutes.CHANGE_FAVORITE.replace(`:id`, id).replace(`:status`, status))
      .reply(200, {...offerRaw, "is_favorite": true});

    return changeStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_FAVORITE,
          payload: {...offerRaw, "is_favorite": true}
        });
      });
  });

  it(`Should make a correct API call mark offer as not favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = `1`;
    const status = FavoriteStatus.REMOVE;
    const changeStatusLoader = changeOfferStatus(id, status);

    apiMock
      .onPost(APIRoutes.CHANGE_FAVORITE.replace(`:id`, id).replace(`:status`, status))
      .reply(200, {...offerRaw, "is_favorite": false});

    return changeStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REMOVE_FAVORITE,
          payload: {...offerRaw, "is_favorite": false}
        });
      });
  });
});
