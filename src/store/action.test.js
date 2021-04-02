import {ActionType, ActionCreator} from './action';

describe(`Action creators work correctly`, () => {
  it(`Action creator requireAuthorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: `test`,
    };

    expect(ActionCreator.requireAuthorization(`test`)).toEqual(expectedAction);
  });

  it(`Action creator setAuthInfo returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_AUTH_INFO,
      payload: `test`,
    };

    expect(ActionCreator.setAuthInfo(`test`)).toEqual(expectedAction);
  });

  it(`Action creator loadOffers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: `test`,
    };

    expect(ActionCreator.loadOffers(`test`)).toEqual(expectedAction);
  });

  it(`Action creator loadOfferById returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFER,
      payload: `test`,
    };

    expect(ActionCreator.loadOfferById(`test`)).toEqual(expectedAction);
  });

  it(`Action creator loadReviews returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: `test`,
    };

    expect(ActionCreator.loadReviews(`test`)).toEqual(expectedAction);
  });

  it(`Action creator loadNearby returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_NEARBY,
      payload: `test`,
    };

    expect(ActionCreator.loadNearby(`test`)).toEqual(expectedAction);
  });

  it(`Action creator loadFavorites returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: `test`,
    };

    expect(ActionCreator.loadFavorites(`test`)).toEqual(expectedAction);
  });

  it(`Action creator offerNotFound returns correct action`, () => {
    const expectedAction = {
      type: ActionType.OFFER_NOT_FOUND
    };

    expect(ActionCreator.offerNotFound()).toEqual(expectedAction);
  });

  it(`Action creator resetOfferState returns correct action`, () => {
    const expectedAction = {
      type: ActionType.RESET_OFFER_STATE
    };

    expect(ActionCreator.resetOfferState()).toEqual(expectedAction);
  });

  it(`Action creator changeCity returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: `test`
    };

    expect(ActionCreator.changeCity(`test`)).toEqual(expectedAction);
  });

  it(`Action creator changeSorting returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_SORTING,
      payload: `test`
    };

    expect(ActionCreator.changeSorting(`test`)).toEqual(expectedAction);
  });

  it(`Action creator addFavorite returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ADD_FAVORITE,
      payload: `test`
    };

    expect(ActionCreator.addFavorite(`test`)).toEqual(expectedAction);
  });

  it(`Action creator removeFavorite returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REMOVE_FAVORITE,
      payload: `test`
    };

    expect(ActionCreator.removeFavorite(`test`)).toEqual(expectedAction);
  });

  it(`Action creator resetFavorites returns correct action`, () => {
    const expectedAction = {
      type: ActionType.RESET_FAVORITES
    };

    expect(ActionCreator.resetFavorites()).toEqual(expectedAction);
  });
});
