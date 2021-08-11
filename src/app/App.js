import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button, Form, Input, Checkbox } from "antd";
import "antd/dist/antd.css";
import { Card, List, Avatar } from "antd";
import { BiNotepad } from "react-icons/bi";

import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001/";
// axios.defaults.headers.common = { Authorization: `${token}` };

const App = () => {
  // sets state for input field
  const [task, setTask] = useState("");

  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isToDoLists, setIsToDoLists] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [initialToDoList, setInitialToDoList] = useState([]);
  const [successfulLogIn, setSuccessfulLogIn] = useState(false);
  const [toDoDescription, setToDoDescription] = useState("");

  const inputElements = useRef();

  // adds the new state variable (task) item to an array via concat, and
  //updates the state (list) variable with the new item.
  // we also set our completed key to false, for filtering later.

  //filters out key key values of 'completed' that equal true, stores them into the variable "filterComplete" and that variable is
  //used to update the state of the completed task list.

  // maps over state variable (list), and grabs new key items, and displays them.
  // console.log(initialToDoList);
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
                      let newArr = [...filteredFalse];
                      console.log(1, "before split", newArr);

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
                            console.log(2, "new data added", newArr);
                            setInitialToDoList(newArr);
                            console.log(
                              3,
                              "passed on as true",
                              initialToDoList
                            );
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
                      console.log("before split: ", newArr);
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
                            console.log("after split", newArr);
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
    console.log(4, "these are the completed=true items", filteredTrue);

    return (
      <div className="row">
        <List
          itemLayout="horizontal"
          dataSource={filteredTrue}
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
  const onFinish = (values) => {
    axios
      .post("http://localhost:3001/signup", values)
      .then((res) => {
        if (res.data.status === 409) {
          inputElements.current.resetFields();
          alert(res.data.message);
        }
        if (res.status === 201) {
          setIsSignUp(false);
          setIsLoginPage(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const render_Sign_Up = () => {
    return (
      <div className="sign_up_form">
        <h2 className="sign_up_header">
          Please enter in a username and password to sign up
        </h2>
        <Form
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          ref={inputElements}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 7, span: 10, offset: 7 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 7, span: 10 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const signUpClick = () => {
    setIsLoginPage(false);
    setIsSignUp(true);
  };

  const loginPage = () => {
    const onLogin = (values) => {
      axios
        .post("http://localhost:3001/users/login", values)
        .then((res) => {
          if (res.data.status === 200) {
            setIsLoginPage(false);
            setIsToDoLists(true);

            let token = res.data.authorization;
            let config = {
              headers: {
                authorization: token,
              },
            };

            localStorage.setItem("Authorization", token);
            axios
              .get("http://localhost:3001/users/userstodo", config)
              .then((res) => {
                if (res.data.status === 200) {
                  let toDoData = res.data.info;

                  let arr = [];
                  arr.push(toDoData);

                  setInitialToDoList(arr[0]);
                  setSuccessfulLogIn(true);
                }
              });
          }
          if (res.data.status === 400) {
            alert(res.data.message);
            inputElements.current.resetFields();
          }
          if (res.data.status === 500) {
            alert(res.data.message);
            inputElements.current.resetFields();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Success:", values);
    };

    const onLoginFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div className="log_in_page">
        <h2 className="sign_up_header">Log in here</h2>
        <Form
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onLogin}
          onFinishFailed={onLoginFailed}
          ref={inputElements}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="password_login"
          >
            <Input.Password />
          </Form.Item>
          <div>
            <a href="#" className="sign_up_link" onClick={signUpClick}>
              Click here to create login details
            </a>
          </div>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 7, span: 10 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 7, span: 10 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
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

  const toDoLists = () => {
    return (
      <div className="App">
        <h1>Stark's To-Do List</h1>
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
          className="toDoInput"
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

  return (
    <div className="App">
      {isSignUp ? render_Sign_Up() : null}
      {isLoginPage ? loginPage() : null}
      {isToDoLists ? toDoLists() : null}
    </div>
  );
};

export default App;
