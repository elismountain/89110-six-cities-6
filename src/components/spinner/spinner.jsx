import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({text = `Loading...`}) => {
  return (
    <div style={{position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%, -50%)`}}>{text}</div>
  );
};

Spinner.propTypes = {
  text: PropTypes.string
};

export default Spinner;
