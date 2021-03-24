import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {authInfoPropType} from '../../prop-types';
import {AppRoutes, AuthorizationStatus} from '../../const';
import {logout} from '../../store/api-actions';
import Icon from '../icon/icon';
// import {getAuthorizationInfo, getAuthorizationStatus} from '../../store/selectors';

const Header = (props) => {
  const {authStatus, authInfo, onLogoutClick} = props;
  const isAuthorized = authStatus === AuthorizationStatus.AUTH;

  const handleLogoutClick = (evt) => {
    evt.preventDefault();
    onLogoutClick();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoutes.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {isAuthorized ?
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.FAVORITES}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">{authInfo.email}</span>
                  </Link>
                  :
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.LOGIN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                }
              </li>
              {isAuthorized &&
                <li className="header__nav-item" style={{marginLeft: `10px`}}>
                  <button className="button" onClick={handleLogoutClick}>
                    <Icon width={20} height={20} />
                  </button>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  // authStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)),
  authInfo: authInfoPropType,
  onLogoutClick: PropTypes.func
};

const mapStateToProps = (state) => ({
  authStatus: getAuthorizationStatus(state),
  authInfo: getAuthorizationInfo(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick() {
    dispatch(logout());
  }
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
