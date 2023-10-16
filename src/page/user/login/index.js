import React, { useEffect, useState } from "react";

import { Button, Card, Col, Form, Image, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Titler from "../../../component/common/Titler";
import CONSTANTS, { ROUTES, appRoot } from "../../../util/constant/CONSTANTS";
import Label from "../../../component/common/Label";
import useHttp from "../../../hooks/use-http";
import { getAuthToken, setAuthDetails } from "../../../util/API/authStorage";
import FormWithButton from "../../../component/common/Form-with-Button";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Registration from "../Registration";
import logo from "../../../asset/logos/icon.svg";

const LogIn = () => {
  const formRef = React.useRef(null);
  const navigate = useNavigate();
  // useEffect(() => {
  // const isLogin = getAuthToken() !== undefined && getAuthToken() !== null;
  // console.log(isLogin, "loh", getAuthToken());
  // if (isLogin) {
  //   // console.log(isLogin, "loh2", getAuthToken());
  //   navigate(appRoot);
  // }
  // }, [navigate]);
  // navigate(appRoot);
  const API = useHttp();
  // const onFinishFirst = (value) => {
  //   // console.log(value);
  //   const payload = {
  //     email: value.email,
  //     password: value.password,
  //   };
  //   API.sendRequest(
  //     CONSTANTS.API.login,
  //     (res) => {
  //       console.log(res?.token, "abc");
  //       setAuthDetails(res?.token);
  //       setLoadings([]);
  //       // navigate(appRoot);
  //       window.location.assign(appRoot);
  //       console.log(
  //         getAuthToken() !== undefined && getAuthToken() !== null,
  //         "loh2",
  //         getAuthToken()
  //       );
  //     },
  //     payload,
  //     "logIn Successful"
  //   );

  //   // notification.success({ message: "Log in ", duration: "2" });
  // };
  const [loadings, setLoadings] = useState([]);

  const validateLogin = (value) => {
    const payload = {
      email: value.email,
      password: value.password,
    };
    // window.location.assign(appRoot);
    // console.log(payload);
    API.sendRequest(
      CONSTANTS.API.login,
      (res) => {
        setAuthDetails(res?.token);
        // setLoadings([]);
        window.location.assign(appRoot);
      },
      payload,
      "LogIn Successful"
    );
  };
  // const enterLoading = (index) => {
  //   setLoadings((prevLoadings) => {
  //     const newLoadings = [...prevLoadings];
  //     newLoadings[index] = true;
  //     return newLoadings;
  //   });
  //   setTimeout(() => {
  //     setLoadings((prevLoadings) => {
  //       const newLoadings = [...prevLoadings];
  //       newLoadings[index] = false;
  //       return newLoadings;
  //     });
  //   }, 3000);
  // };
  return (
    <>
      {/* <Row className="form-2" gutter={[0, 4]}>
        <Col span={24}>
          <div className="login-logo">
            <Image preview={false} src={Logo} />
          </div>
        </Col>
        <Col span={24} className="login-logo">
          <Titler
            big="Sign in to account"
            small="Enter your credentials to proceed"
          />
        </Col>
        <Form
          size="medium"
          style={{
            width: "100%",
          }}
          ref={formRef}
          layout="vertical"
          name="control-ref"
          onFinish={onFinishFirst}
        >
          <Label>EMAIL</Label>
          <Form.Item
            name="email"
            // label="EMAIL"
            className="form"
            rules={[
              {
                required: true,
                message: "Please Enter Valid Email",
              },
              {
                type: "email",
                message: "Sorry, we dont recognise this email address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Label>
            PASSWORD <Link to={ROUTES.FORGOT_PASSWORD}>Forget Password?</Link>
          </Label>
          <Form.Item
            // label="PASSWORD"
            name="password"
            className="form"
            rules={[
              {
                required: true,
                message: "Enter Valid Password",
              },
              () => ({
                validator(_, value) {
                  if (value && /^[0-9]{4,}$/.exec(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Password must be 8 character ")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ marginTop: "35px" }}>
            <Button
              loading={loadings[2]}
              onClick={() => {
                enterLoading(2);
              }}
              size="large"
              type="primary"
              htmlType="submit"
              block
            >
              Next
            </Button>
          </Form.Item>
        </Form>
        <Col
          span={24}
          style={{
            display: "flex",
            width: "150px",
            justifyContent: "space-evenly",
          }}
        >
          Don't Have an Account <Link to="/Registration">Register Now!</Link>
        </Col>
      </Row> */}
      <div
        className="h-screen flex justify-center  items-center"
        style={{ background: "#121212" }}
      >
        <Row className="">
          <Col span={10} sm={24} xs={24} md={10} lg={10}>
            <div className="mr-10 mt-14 flex content-center justify-center">
              <Image
                src={logo}
                alt="Bash"
                preview={false}
                width={300}
                className="p-5"
              />
            </div>
          </Col>
          <Col span={14} sm={24} xs={24} md={14} lg={14}>
            <Card style={{ background: "#202020", border: "none" }}>
              <p className="text-3xl pl-4 font-medium	text-white">Login</p>
              {/* <FormWithButton
                menu="LOGIN_PAGE_MODAL"
                name="Login"
                onCreate={(element) => {
                  console.log(element);
                }}
                inline={false}
              /> */}
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={validateLogin}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    type="email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={API?.isLoading}

                    // disabled
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        {/* <Registration /> */}
      </div>
    </>
  );
};
export default LogIn;
