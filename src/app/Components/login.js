import "../App.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Form, Input, Checkbox } from "antd";
import "antd/dist/antd.css";
import { Link, Redirect, Route, useHistory } from "react-router-dom";

const Log_In_Page = (props) => {
  const inputElements = useRef();
  const onLogin = (values) => {
    axios
      .post("http://localhost:3001/users/login", values)
      .then((res) => {
        if (res.data.status === 200) {
          let user = res.data.user;
          let token = res.data.authorization;
          localStorage.setItem("Authorization", token);

          props.onLogin(user);
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
  };

  const onLoginFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="log_in_page">
      <h2 className="sign_up_header">Log in here for your ToDo list</h2>
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
          <Link to={{ pathname: "/signup" }}>
            <a href="#" className="sign_up_link">
              Click here to create login details
            </a>
          </Link>
        </div>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 24 }}
          className="rememberCheckBoxLogInPage"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="submitBtnLogInPage"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Log_In_Page;
