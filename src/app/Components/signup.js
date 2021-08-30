import "../App.css";
import React, { useRef } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Sign_Up = () => {
  const inputElements = useRef();
  const onFinish = (values) => {
    axios
      .post("http://localhost:3001/signup", values)
      .then((res) => {
        if (res.data.status === 409) {
          inputElements.current.resetFields();
          alert(res.data.message);
        }
        if (res.status === 201) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
          <div>
            <Link to={{ pathname: "/" }}>
              <a href="#" className="sign_up_link">
                Click here to log in
              </a>
            </Link>
          </div>
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
export default Sign_Up;
