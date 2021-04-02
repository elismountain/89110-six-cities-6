import React from 'react';
import {render, screen} from '@testing-library/react';
import Spinner from './spinner';


describe(`Spinner should render correctly`, () => {
  it(`Spinner should render correctly without text prop`, () => {
    render(
        <Spinner />
    );

    expect(screen.getByText(`Loading...`)).toBeInTheDocument();
  });

  it(`Spinner should render correctly with text prop`, () => {
    render(
        <Spinner text={`Please wait...`} />
    );

    expect(screen.getByText(`Please wait...`)).toBeInTheDocument();
  });
});
