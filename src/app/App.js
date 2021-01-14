import "./App.css";

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

  // adds the new state variable (task) item to an array via concat, and
  //updates the state (list) variable with the new item.
  // we also set our completed key to false, for filtering later.
  const handleClick = () => {
    if (task === "") {
      alert("Put text in field");
    } else {
      var completed = false;
      const newToDo = list.concat({
        task,
        completed,
        _id: Math.floor(Math.random() * 10000000),
      });
      setList(newToDo);
      setTask("");
    }
  };

  //filters out key key values of 'completed' that equal true, stores them into the variable "filterComplete" and that variable is
  //used to update the state of the completed task list.

  // maps over state variable (list), and grabs new key items, and displays them.
  const listItems = list
    .filter((x) => x.completed === false)
    .map((d) => (
      <div key={d._id.toString()} className="row">
        <div className="col-sm-10">
          <li className="uniqueItem">{d.task}</li>
        </div>
        <div className="col-sm-2">
          <span>
            <button
              className="btnComplete"
              onClick={() => {
                let newArr = [...list];
                let newNew = newArr.findIndex((item) => item._id === d._id);
                newArr[newNew].completed = true;
                console.log(newArr);
                setList(newArr);
                console.log(newNew);
              }}
            >
              <CheckCircleOutlined />
            </button>
            <button
              className="btnRemove"
              onClick={() => {
                let newArr = [...list];
                let newNew = newArr.findIndex((item) => item._id === d._id);
                newArr.splice(newNew, 1);
                console.log(newArr);
                setList(newArr);
              }}
            >
              <CloseCircleOutlined />
            </button>
          </span>
        </div>
      </div>
    ));

  const completedListItems = list
    .filter((x) => x.completed === true)
    .map((d) => (
      <div key={d._id.toString()} className="row">
        <div className="col-sm-10">
          <li className="uniqueItem">{d.task}</li>
        </div>
        <div className="col-sm-2"></div>
      </div>
    ));

  return (
    <div className="App">
      <h1>Stark's To-Do List</h1>
      <div className="toDoWrapper">
        <input
          size="100"
          type="text"
          className="toDoInput"
          id="textInput"
          value={task}
          //updates state variable (task) to be the value of the input field
          onChange={(event) => setTask(event.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          autoFocus
        ></input>
      </div>
      <div className="addToListWrapper">
        <Button onClick={handleClick} type="primary" id="btnClick">
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
