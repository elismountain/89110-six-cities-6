import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';

import {connect} from 'react-redux';
import {changeOfferStatus} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user/selector';

import {AuthorizationStatus, AppRoutes} from '../../const';

import cn from 'classnames';

const Status = {
  REMOVE: 0,
  ADD: 1
};

const BookmarkButton = (props) => {
  const {authStatus, offer, classModifier = ``, width = `18`, height = `19`, onButtonClick} = props;
  const history = useHistory();

  const isAuthorized = authStatus === AuthorizationStatus.AUTH;

  const handleBookmarkClick = () => {
    if (!isAuthorized) {
      history.push(AppRoutes.LOGIN);
    } else {
      onButtonClick(offer.id, offer.isFavorite ? Status.REMOVE : Status.ADD);
    }
  };

  return (
    <button type="button"
      className={cn(`${classModifier}bookmark-button button`, {[`${classModifier}bookmark-button--active`]: offer.isFavorite})}
      onClick={handleBookmarkClick}>
      <svg className={`${classModifier}bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

BookmarkButton.propTypes = {
  authStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)),
  offer: offerPropType,
  classModifier: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onButtonClick: PropTypes.func
};

const mapStateToProps = (state) => ({
  authStatus: getAuthorizationStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onButtonClick(id, status) {
    dispatch(changeOfferStatus(id, status));
  }
});

export {BookmarkButton};
export default connect(mapStateToProps, mapDispatchToProps)(BookmarkButton);
