import React, {useState, useEffect, createRef} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {SortingTypes} from '../../const';
import cn from 'classnames';

const OffersSorting = (props) => {
  const {activeSorting, onChangeSorting} = props;
  const [opened, setOpened] = useState(false);
  const formNode = createRef();

  const handleDropdownClick = () => {
    setOpened((prevState) => !prevState);
  };

  const handleItemClick = (evt) => {
    onChangeSorting(evt.target.innerText);
    setOpened(false);
  };

  const handleClickOutside = (evt) => {
    if (formNode.current.contains(evt.target)) {
      return;
    }
    setOpened(false);
  };

  useEffect(() => {
    document[opened ? `addEventListener` : `removeEventListener`](`mousedown`, handleClickOutside);

    return () => {
      document.removeEventListener(`mousedown`, handleClickOutside);
    };
  }, [opened]);

  return (
    <form className="places__sorting" action="#" method="get" ref={formNode} style={{display: `inline-block`}}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleDropdownClick}>
        {activeSorting}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={cn(`places__options places__options--custom`, {'places__options--opened': opened})}>
        {Object.values(SortingTypes).map((item, i) => (
          <li className={cn(`places__option`, {'places__option--active': activeSorting === item})} tabIndex="0" key={`sorting${i}`} onClick={handleItemClick}>{item}</li>
        ))}
      </ul>
    </form>
  );
};

OffersSorting.propTypes = {
  activeSorting: PropTypes.oneOf(Object.values(SortingTypes)),
  onChangeSorting: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activeSorting: state.activeSorting
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSorting(sortingType) {
    dispatch(ActionCreator.changeSorting(sortingType));
  },
});

export {OffersSorting};
export default connect(mapStateToProps, mapDispatchToProps)(OffersSorting);
