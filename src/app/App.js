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

// axios.defaults.baseURL = "http://localhost:3001/";
// axios.defaults.headers.common = { Authorization: `${token}` };

const App = () => {
  // sets state for input field
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  console.log("this is the token 2", token);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    let config = {
      headers: {
        authorization: token,
      },
    };

    axios.get("http://localhost:3001/checkAuth", config).then((res) => {
      if (res.status === 201) {
        console.log("checkAuth", res);
        setUser(res.data.name);
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {(props) => {
              if (user === null) {
                return (
                  <Log_In_Page
                    {...props}
                    onLogin={setUser}
                    getToken={setToken}
                  />
                );
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
            token={token}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
