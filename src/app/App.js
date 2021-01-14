import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "antd";
import { Card } from "antd";

import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const App = () => {
  // sets state for input field
  const [task, setTask] = useState("");
  //sets state for object array of inputs
  const [list, setList] = useState([]);
  //set state for the completed tasks list
  const [completedList, setCompletedList] = useState([]);

  // adds the new state variable (task) item to an array via concat, and
  //updates the state (list) variable with the new item.
  // we also set our completed key to false, for filtering later.
  const handleClick = () => {
    var completed = false;
    const newToDo = list.concat({
      task,
      completed,
      _id: (Math.random() + 1).toFixed(2),
    });
    setList(newToDo);
  };

  const filterListUncomplete = () => {
    let filterIncomplete = list.filter((x) => x.completed === false);
    setList(filterIncomplete);
    console.log(filterIncomplete);
  };

  //filters out key key values of 'completed' that equal true, stores them into the variable "filterComplete" and that variable is
  //used to update the state of the completed task list.
  const filterListComplete = () => {
    let filterComplete = list.filter((x) => x.completed === true);
    setCompletedList(filterComplete);
    console.log(filterComplete);
  };

  const removeItemList = () => {
    setList();
  };

  // maps over state variable (list), and grabs new key items, and displays them.
  const listItems = list.map((d) => (
    <div className="row">
      <div className="col-sm-10">
        <li className="uniqueItem" key={d._id.toString()}>
          {d.task}
        </li>
      </div>
      <div className="col-sm-2">
        <span>
          <button
            className="btnComplete"
            onClick={() => {
              d.completed = true;
              filterListUncomplete();
              filterListComplete();
            }}
          >
            <CheckCircleOutlined />
          </button>
          <button className="btnRemove" onClick={() => {}}>
            <CloseCircleOutlined />
          </button>
        </span>
      </div>
    </div>
  ));
  console.log(completedList);
  // maps over the completedlist state, and displays the value of the key "task"
  const completedListItems = completedList.map((d) => (
    <div className="row">
      <div className="col-sm-10">
        <li className="uniqueItem" key={d._id.toString()}>
          {d.task}
        </li>
      </div>
      <div className="col-sm-2"></div>
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
          //updates state variable (task) to be the value of the input field
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
                id="completedTaskCard"
                title="Completed Tasks"
                border="true"
                style={{ width: 500, height: 300, marginTop: 50 }}
              >
                <ul>{completedListItems}</ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
