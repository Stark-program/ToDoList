import React, { useState } from "react";
import { Button } from "antd";
// import { toDoList } from "./listOfStuffToDo";

const InputFieldAndButton = () => {
  const [task, setTask] = useState(true);

  const handleClick = () => {
    console.log(task);
  };
  var testArray = [];
  return (
    <div className="App">
      <h1>Stark's To-Do List</h1>
      <div className="toDoWrapper">
        <input
          size="100"
          type="text"
          className="toDoInput"
          // placeholder={useState}
          id="textInput"
          onChange={(event) => setTask(event.target.value)}
        ></input>
      </div>
      <div className="addToListWrapper">
        <Button onClick={handleClick} type="primary">
          Add to List
        </Button>
      </div>
      <div>{testArray}</div>
    </div>
  );
};

export default InputFieldAndButton;
