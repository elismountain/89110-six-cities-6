import React from 'react';
import {Link} from "react-router-dom";

const PageNotFound = () => {
  return (
    <React.Fragment>
      <h1>
        404.
        <br />
        <strong>Page not found</strong>
      </h1>
      <Link to="/">Go to the main page</Link>
    </React.Fragment>
  );
};

export default PageNotFound;
