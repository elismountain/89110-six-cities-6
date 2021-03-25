import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header';
import SignInForm from '../sign-in/sign-in-form';

const SignIn = () => {
  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <SignInForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/?city=Amsterdam">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
