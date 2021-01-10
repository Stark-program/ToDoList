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
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const listItems = list.map((d) => <li key={d.task}>{d.task}</li>);
  const handleClick = () => {
    const newToDo = list.concat({ task });
    setList(newToDo);
  };
  const handleInputReset = () => {
    var input = (document.getElementById("textInput").value = "");
    return input;
  };

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
                <ul>
                  <div className="row">
                    <div className="col-sm-10">{listItems}</div>
                    <div className="col-sm-2">
                      <span>
                        <CheckCircleOutlined />
                      </span>
                    </div>
                  </div>
                </ul>
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
