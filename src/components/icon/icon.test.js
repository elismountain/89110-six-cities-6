import React from 'react';
import {render} from '@testing-library/react';
import Icon from './icon';

describe(`Icon should render correctly`, () => {
  it(`Icon should render correctly without size prop`, () => {
    const {container} = render(
        <Icon />
    );
    expect(container).toMatchSnapshot();
  });

  it(`Icon should render correctly with size prop`, () => {
    const {container} = render(
        <Icon size={20} />
    );
    expect(container).toMatchSnapshot();
  });
});
