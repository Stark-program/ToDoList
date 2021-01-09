import React, { useState } from "react";
import { Button } from "antd";


const InputFieldAndButton = () => {
  const [task, setTask] = useState("");
  const [list, setList] =useState([]);
  const listItems = list.map((d) => <li key={d.task}>{d.task}</li>)
  

  const handleClick = () => {
    const newToDo = list.concat({task})
    setList(newToDo)
  };
  console.log(list);
  
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
        <Button onClick={handleClick} type="primary">
          Add to List
        </Button>
      </div>
      <div>{listItems}</div>
    </div>
  );
};

export default InputFieldAndButton;
