import React from 'react';
import {render, screen} from '@testing-library/react';
import MainEmpty from './main-empty';
import {Cities} from '../../const';


it(`MainEmpty should render correctly`, () => {
  render(
      <MainEmpty activeCity={Cities.PARIS} />
  );

  expect(screen.getByText(`No places to stay available`)).toBeInTheDocument();
  expect(screen.getByText(`We could not find any property available at the moment in ${Cities.PARIS}`)).toBeInTheDocument();
});
