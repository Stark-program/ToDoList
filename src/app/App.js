import "./App.css";
import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import Log_In_Page from "./Components/login";
import Sign_Up from "./Components/signup";
import To_Do_Lists from "./Components/todo";
import ProtectedRoute from "./Components/ProtectedRoute";

import "antd/dist/antd.css";

const App = () => {
  const [user, setUser] = useState(null);

  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("Authorization");
    config.headers.Authorization = token;

    return config;
  });

  useEffect(() => {
    async function fetchAuth() {
      const response = await axios.get("http://localhost:3001/checkAuth");
      if (response.status === 201) {
        setUser(response.data.name);
      }
    }
    fetchAuth();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {(props) => {
              if (user === null) {
                return <Log_In_Page {...props} onLogin={setUser} />;
              } else return <Redirect to="/todo" />;
            }}
          </Route>
          <Route exact path="/signup">
            <Sign_Up />
          </Route>
          <ProtectedRoute
            exact
            path="/todo"
            component={To_Do_Lists}
            user={user}
            onLogout={setUser}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
