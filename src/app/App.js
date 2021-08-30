import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Log_In_Page from "./Components/login";
import Sign_Up from "./Components/signup";
import To_Do_Lists from "./Components/todo";
import ProtectedRoute from "./Components/ProtectedRoute";
import "antd/dist/antd.css";

// axios.defaults.baseURL = "http://localhost:3001/";
// axios.defaults.headers.common = { Authorization: `${token}` };

const App = () => {
  // sets state for input field

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Log_In_Page />
          </Route>
          <Route exact path="/signup">
            <Sign_Up />
          </Route>
          <ProtectedRoute
            exact
            path="/todo"
            component={To_Do_Lists}
          ></ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
