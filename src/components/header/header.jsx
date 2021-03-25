import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AppRoutes, AuthorizationStatus} from '../../const';
import {authInfoPropType} from '../../prop-types';

const Header = (props) => {
  const {authStatus, authInfo} = props;

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
                <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.LOGIN}>
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  {authStatus === AuthorizationStatus.AUTH ?
                    <span className="header__user-name user__name">{authInfo.email}</span>
                    :
                    <span className="header__login">Sign in</span>
                  }
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)),
  authInfo: authInfoPropType
};

const mapStateToProps = (state) => ({
  authStatus: state.authorizationStatus,
});

export {Header};
export default connect(mapStateToProps)(Header);
