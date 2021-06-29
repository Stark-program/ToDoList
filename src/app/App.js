import "./App.css";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button, Form, Input, Checkbox, Col } from "antd";
import "antd/dist/antd.css";
import { Card } from "antd";
import axios from "axios";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const App = () => {
  // sets state for input field
  const [task, setTask] = useState("");
  //sets state for object array of inputs
  const [list, setList] = useState([]);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isToDoLists, setIsToDoLists] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

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
  const onFinish = (values) => {
    axios
      .post("http://localhost:3001/users", values)
      .then((res) => {
        console.log("User submitted", res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Success:", values);
    setIsSignUp(false);
    setIsLoginPage(true);
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
            console.log("put code here");
          }
          if (res.data.status === 400) {
            console.log("error bitch");
            alert("Wrong username or password");
          }
          console.log(res);
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

  const toDoLists = () => {
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
                  style={{ width: 500, height: "100%", marginTop: 50 }}
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
                  style={{ width: 500, height: "100%", marginTop: 50 }}
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

  return (
    <div className="App">
      {isSignUp ? render_Sign_Up() : null}
      {isLoginPage ? loginPage() : null}
      {isToDoLists ? toDoLists() : null}
    </div>
  );
};

export default App;
