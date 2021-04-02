import {reducer} from './reducer';
import {ActionType, ActionCreator} from '../action';
import {favOfferRaw, favOfferAdapted, favOffersRaw} from './test-mocks';
import {APIRoutes} from '../../const';

import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {fetchFavorites} from '../api-actions';

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {}))
      .toEqual({
        offers: [],
        isDataLoaded: false
      });
  });

  it(`Reducer should add favorite offer`, () => {
    const state = {
      offers: [],
      isDataLoaded: true
    };

    const addFavoriteAction = {
      type: ActionType.ADD_FAVORITE,
      payload: favOfferRaw,
    };

    expect(reducer(state, addFavoriteAction))
      .toEqual({
        offers: [favOfferAdapted],
        isDataLoaded: true
      });
  });

  it(`Reducer should not add favorite offer if data is not loaded`, () => {
    const state = {
      offers: [],
      isDataLoaded: false
    };

    const addFavoriteAction = {
      type: ActionType.ADD_FAVORITE,
      payload: favOfferRaw,
    };

    expect(reducer(state, addFavoriteAction))
      .toEqual({
        offers: [],
        isDataLoaded: false
      });
  });

  it(`Reducer should remove favorite offer`, () => {
    const state = {
      offers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: true}],
      isDataLoaded: true
    };

    const removeFavoriteAction = {
      type: ActionType.REMOVE_FAVORITE,
      payload: {"id": 1, "is_favorite": false},
    };

    expect(reducer(state, removeFavoriteAction))
      .toEqual({
        offers: [{id: 2, isFavorite: true}],
        isDataLoaded: true
      });
  });

  it(`Reducer should reset favorite offers`, () => {
    const state = {
      offers: [{id: 1, isFavorite: true}, {id: 2, isFavorite: true}, {id: 3, isFavorite: true}],
      isDataLoaded: true
    };

    expect(reducer(state, ActionCreator.resetFavorites()))
      .toEqual({
        offers: [],
        isDataLoaded: false
      });
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to fetch favorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavorites();

    apiMock
      .onGet(APIRoutes.FAVORITES)
      .reply(200, favOffersRaw);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: favOffersRaw
        });
      });
  });
});
