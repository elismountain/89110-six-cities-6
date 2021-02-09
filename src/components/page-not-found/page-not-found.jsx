import React from 'react';

const PageNotFound = () => {
  return (
  <Fragment>
    <h1>
      404.
      <br />
      <small>Page not found</small>
    </h1>
    <Link to="/">Go to the main page</Link>
  </Fragment>
  );
};

export default PageNotFound;
