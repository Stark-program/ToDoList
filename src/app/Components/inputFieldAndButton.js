import React, {useState} from 'react';
import { Button } from "antd";

const inputFieldAndButton = () => (
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
      </div> 
      );

    export default inputFieldAndButton