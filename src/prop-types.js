import PropTypes from 'prop-types';

export const locationPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired
});

const cityPropType = PropTypes.shape({
  location: locationPropType.isRequired,
  name: PropTypes.string.isRequired
});

export const offerPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]),
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }),
  city: cityPropType.isRequired,
  location: locationPropType.isRequired
});

export const reviewPropType = PropTypes.shape({
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  })
});

export const authInfoPropType = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string
});
