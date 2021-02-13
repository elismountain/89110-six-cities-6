import PropTypes from 'prop-types';

const locationPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired
});

export const offerPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOff([`apartment`, `room`, `house`, `hotel`]),
  description: PropTypes.string.isRequired,
  isFavorite: PropTypes.boolean.isRequired,
  isPremium: PropTypes.boolean.isRequired,
  bedrooms: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.shape({
    location: locationPropType.isRequired,
    name: PropTypes.string.isRequired,
  }),
  location: locationPropType.isRequired,
  host: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isPro: PropTypes.boolean.isRequired,
    name: PropTypes.string.isRequired,
  })
});

// создать компонент ревью
// const reviewPropType = PropTypes.shape({
//   comment: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
//   rating: PropTypes.number.isRequired,
//   user: PropTypes.shape({
//     avatarUrl: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     isPro: PropTypes.boolean.isRequired,
//     name: PropTypes.number.isRequired
//   })
// });
