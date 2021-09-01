import "../App.css";
import React, { useState, useEffect } from "react";

import { Card, List, Button } from "antd";
import { BiNotepad } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";
import { Link, useHistory } from "react-router-dom";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const To_Do_Lists = (props) => {
  const [initialToDoList, setInitialToDoList] = useState([]);
  const [toDoDescription, setToDoDescription] = useState("");
  const [task, setTask] = useState("");
  console.log("todolist", props);

  useEffect(async () => {
    let token = props.token;
    console.log("this is the token", token);
    let config = {
      headers: {
        authorization: token,
      },
    };

    await axios
      .get("http://localhost:3001/users/userstodo", config)
      .then((res) => {
        if (res.data.status === 200) {
          let toDoData = res.data.info;

          let arr = [];
          arr.push(toDoData);
          console.log("test", res.data.info);

          setInitialToDoList(arr[0]);
        }
      });
  }, []);

  const listItems = () => {
    const filteredFalse = initialToDoList.filter(
      (x) => x.to_Do_Completed === false
    );

    return (
      <div className="row">
        <List
          itemLayout="horizontal"
          dataSource={filteredFalse}
          renderItem={(d) => (
            <List.Item>
              <List.Item.Meta
                avatar={<BiNotepad className="notepad-logo" size={50} />}
                title={d.to_Do_Item.toUpperCase()}
                description={d.description}
              />
              <div className="col-sm-2">
                <span>
                  <button
                    className="btnComplete"
                    onClick={() => {
                      let token = localStorage.getItem("Authorization");
                      let config = {
                        headers: {
                          authorization: token,
                        },
                      };
                      let newArr = [...initialToDoList];

                      let newNew = newArr.findIndex(
                        (item) => item._id === d._id
                      );

                      let newData = newArr.filter((x) => {
                        if (x.to_Do_Item === d.to_Do_Item) {
                          return x.to_Do_Item;
                        }
                      });

                      axios
                        .post(
                          "http://localhost:3001/completed",
                          newData,
                          config
                        )
                        .then((res) => {
                          if (res.status === 200) {
                            newArr[newNew].to_Do_Completed = true;

                            setInitialToDoList(newArr);
                          }
                        });
                    }}
                  >
                    <CheckCircleOutlined />
                  </button>
                  <button
                    className="btnRemove"
                    onClick={() => {
                      let token = localStorage.getItem("Authorization");
                      let config = {
                        headers: {
                          authorization: token,
                        },
                      };
                      let newArr = [...initialToDoList];

                      let newNew = newArr.findIndex(
                        (item) => item._id === d._id
                      );
                      let deletedArr = newArr.filter((x) => {
                        return x._id === d._id;
                      });

                      axios
                        .post(
                          "http://localhost:3001/deleted",
                          deletedArr,
                          config
                        )
                        .then((res) => {
                          if (res.status === 200) {
                            newArr.splice(newNew, 1);

                            setInitialToDoList(newArr);
                          }
                        });
                    }}
                  >
                    <CloseCircleOutlined />
                  </button>
                </span>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  };

  const completedListItems = () => {
    const filteredTrue = initialToDoList.filter(
      (x) => x.to_Do_Completed === true
    );

    return (
      <div className="row">
        <List
          itemLayout="horizontal"
          dataSource={filteredTrue}
          renderItem={(d) => (
            <List.Item>
              <List.Item.Meta
                avatar={<FcCheckmark className="notepad-logo" size={50} />}
                title={d.to_Do_Item.toUpperCase()}
                description={d.description}
              />
              <div className="col-sm-2">
                <span>
                  <button
                    className="btnComplete"
                    onClick={() => {
                      let token = localStorage.getItem("Authorization");
                      let config = {
                        headers: {
                          authorization: token,
                        },
                      };
                      let newArr = [...initialToDoList];
                      let newNew = newArr.findIndex(
                        (item) => item._id === d._id
                      );
                      let newData = newArr.filter((x) => {
                        if (x.to_Do_Item === d.to_Do_Item) {
                          return x.to_Do_Item;
                        }
                      });

                      axios
                        .post(
                          "http://localhost:3001/incomplete",
                          newData,
                          config
                        )
                        .then((res) => {
                          if (res.status === 200) {
                            newArr[newNew].to_Do_Completed = false;
                            setInitialToDoList(newArr);
                          }
                        });
                    }}
                  >
                    <LeftCircleOutlined />
                  </button>
                  <button
                    className="btnRemove"
                    onClick={() => {
                      let token = localStorage.getItem("Authorization");
                      let config = {
                        headers: {
                          authorization: token,
                        },
                      };
                      let newArr = [...initialToDoList];
                      let newNew = newArr.findIndex(
                        (item) => item._id === d._id
                      );
                      let deletedArr = newArr.filter((x) => {
                        return x._id === d._id;
                      });

                      axios
                        .post(
                          "http://localhost:3001/deleted",
                          deletedArr,
                          config
                        )
                        .then((res) => {
                          if (res.status === 200) {
                            newArr.splice(newNew, 1);
                            setInitialToDoList(newArr);
                          }
                        });
                    }}
                  >
                    <CloseCircleOutlined />
                  </button>
                </span>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  };

  const handleClick = () => {
    let token = localStorage.getItem("Authorization");
    let config = {
      headers: {
        authorization: token,
      },
    };

    if (task === "") {
      alert("Put text in field");
    } else {
      const newToDo = {
        to_Do_Item: task,
        to_Do_Completed: false,
        description: toDoDescription,
      };

      axios
        .post("http://localhost:3001/users/userstodo", newToDo, config)
        .then((res, err) => {
          if (res.data.status === 409) {
            alert(`${res.data.message}`);
            setTask("");
            setToDoDescription("");
          } else {
            let oldArr = initialToDoList;
            setInitialToDoList([...oldArr, newToDo]);
            setToDoDescription(toDoDescription);
            setTask("");
            setToDoDescription("");
          }
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("token");
    props.onLogout(null);
  };

  return (
    <div className="App">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <h1>{`${props.user}'s To Do List`}</h1>

      <div className="toDoWrapper">
        <input
          placeholder="task title"
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
      <input
        width="100%"
        className="descriptionInput"
        placeholder="description of task"
        value={toDoDescription}
        onChange={(e) => setToDoDescription(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      ></input>
      <div className="addToListWrapper">
        <Button onClick={handleClick} type="primary" id="btnClick">
          Add to List
        </Button>
      </div>

      <div className="container itemLists">
        <div className="row">
          <div className="col-lg-6 listToDo">
            <div className="site-card-border-less-wrapper">
              <Card
                className="completed-list"
                title="Stuff To Do"
                border="true"
                style={{
                  height: "100%",
                  marginTop: 50,
                  backgroundColor: "#a3a3c2",
                }}
              >
                <ul>{listItems()}</ul>
              </Card>
            </div>
          </div>
          <div className="col-lg-6 listComplete">
            <div className="site-card-border-less-wrapper">
              <Card
                className="completed-list"
                id="completedTaskCard"
                title="Completed Tasks"
                border="true"
                style={{
                  height: "100%",
                  marginTop: 50,
                  backgroundColor: "#a3a3c2",
                }}
              >
                <ul>{completedListItems()}</ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default To_Do_Lists;
