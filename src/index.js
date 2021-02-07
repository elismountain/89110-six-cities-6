import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  AD_COUNT: 312,
  CITIES: [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`]
};

ReactDOM.render(
    <App
      adCount={Setting.AD_COUNT}
      cities={Setting.CITIES}
    />,
    document.querySelector(`#root`)
);
