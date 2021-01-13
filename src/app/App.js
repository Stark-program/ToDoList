import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "antd";
import { Card } from "antd";

import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const App = () => {
  // sets state for input field, and sets state for
  // input value storage to be displayed on screen.
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  // adds the new input item to an array via concat, and
  //updates the state variable with the new item.
  const handleClick = () => {
    const newToDo = list.concat({ task });
    setList(newToDo);
  };
  // maps over state variable list, and grabs new key items, and displays them.
  const listItems = list.map((d) => (
    <div className="row">
      <div className="col-sm-10">
        <li className="cardInput" key={d.task}>
          {d.task}
        </li>
      </div>
      <div className="col-sm-2">
        <span>
          <button className="btnComplete">
            <CheckCircleOutlined />
          </button>
          <button className="btnRemove">
            <CloseCircleOutlined />
          </button>
        </span>
      </div>
    </div>
  ));

  // Clears input field and resets it to an empty string.
  const handleInputReset = () => {
    var input = (document.getElementById("textInput").value = "");
    return input;
  };
  // When "Enter button" is pushed down, it runs the handleClick function.
  const enterSubmit = useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleClick();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleClick]);
  // When "Enter button" is released, it clears input field.
  const inputReset = useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleInputReset();
      }
    };
    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, [handleInputReset]);

  return (
    <div className="App">
      <h1>Stark's To-Do List</h1>
      <div className="toDoWrapper">
        <input
          size="100"
          type="text"
          className="toDoInput"
          id="textInput"
          onChange={(event) => setTask(event.target.value)}
        ></input>
      </div>
      <div className="addToListWrapper">
        <Button
          onClick={handleClick}
          type="primary"
          onKeyPress={enterSubmit}
          onKeyUp={inputReset}
          id="btnClick"
        >
          Add to List
        </Button>
      </div>

      <div className="container itemLists">
        <div className="row">
          <div className="col-sm-6 listToDo">
            <div className="site-card-border-less-wrapper">
              <Card
                title="Stuff To Do"
                border="true"
                style={{ width: 500, height: 300, marginTop: 50 }}
              >
                <ul>{listItems}</ul>
              </Card>
            </div>
          </div>
          <div className="col-sm-6 listComplete">
            <div className="site-card-border-less-wrapper">
              <Card
                title="Completed Tasks"
                border="true"
                style={{ width: 500, height: 300, marginTop: 50 }}
              ></Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
