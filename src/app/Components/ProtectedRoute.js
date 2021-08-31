import React from "react";
import { Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  if (!restOfProps.user) {
    return <Redirect to="/" />;
  } else return <Component {...restOfProps} />;
}

export default ProtectedRoute;
