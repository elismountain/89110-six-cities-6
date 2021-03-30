import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1={21} y1={12} x2={9} y2={12}/>
    </svg>
  );
};

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default Icon;
