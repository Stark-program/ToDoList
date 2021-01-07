import React, { useState } from "react";
import InputFieldAndButton from "./inputFieldAndButton";
import { Card } from "antd";

const ListOfStuffToDo = () => {
  var toDoList = [];
  return (
    <div className="container itemLists">
      <div className="row">
        <div className="col-sm-6 listToDo">
          <div className="site-card-border-less-wrapper">
            <Card
              title="Stuff To Do"
              border={true}
              style={{ width: 500, height: 300, marginTop: 50 }}
            >
              <p>example</p>
              <p>example</p>
              <p>example</p>
            </Card>
          </div>
        </div>
        <div className="col-sm-6 listComplete">
          <div className="site-card-border-less-wrapper">
            <Card
              title="Completed Tasks"
              border={true}
              style={{ width: 500, height: 300, marginTop: 50 }}
            >
              <p>example</p>
              <p>example</p>
              <p>example</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfStuffToDo;
