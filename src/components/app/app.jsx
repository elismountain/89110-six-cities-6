import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main';

const App = ({adCount, cities}) => {
  return (
    <Main adCount={adCount} cities={cities} />
  )
}

App.propTypes = {
  adCount: PropTypes.number.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string)
};

export default App;
