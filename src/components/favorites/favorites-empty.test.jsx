import React from 'react';
import {render, screen} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

it(`FavoritesEmpty should render correctly with text prop`, () => {
  render(
      <FavoritesEmpty />
  );

  expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
  expect(screen.getByText(`Save properties to narrow down search or plan your future trips.`)).toBeInTheDocument();
});
