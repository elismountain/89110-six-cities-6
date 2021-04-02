import React from 'react';
import {render} from '@testing-library/react';
import OfferGallery from '../offer-gallery/offer-gallery';
import {offerAdapted} from '../../store/offers/test-mocks';

it(`OfferGallery should render correctly`, () => {
  const {container} = render(
      <OfferGallery images={offerAdapted.images} />
  );

  expect(container).toMatchSnapshot();
});
