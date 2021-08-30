import axios from "axios";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useState } from "react";
import To_Do_Lists from "./todo";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [isValidated, setIsValidated] = useState(false);
  let token = localStorage.getItem("Authorization");
  let config = {
    headers: {
      authorization: token,
    },
  };
  axios.get("http://localhost:3001/checkAuth", config).then((res) => {
    let authToken = res.config.headers.authorization;
    if (authToken === token) {
      console.log("res received", res);
      setIsValidated(true);
    }
    console.log("value", isValidated);
    return null;
  });

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isValidated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
