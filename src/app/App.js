import "./App.css";
import React from "react";
import { Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <div className="App">
    <h1>Stark's To-Do List</h1>
    <div className="toDoWrapper">
      <input
        size="100"
        type="text"
        className="toDoInput"
        placeholder="Put text here..."
      ></input>
    </div>
    <div className="addToListWrapper">
      <Button type="primary">Add to List</Button>
    </div>
    <div className="container itemLists">
      <div className="row">
        <div className="col-sm-6 listToDo">testing1</div>
        <div className="col-sm-6 listComplete">testing2</div>
      </div>
    </div>
  </div>
);

export default App;
