import React, { useEffect, useState } from "react";

import { Button, Col, Form, Image, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Titler from "../../../component/common/Titler";
import CONSTANTS, { ROUTES, appRoot } from "../../../util/constant/CONSTANTS";
import Label from "../../../component/common/Label";
import Logo from "../../../asset/image/M81-Logo-1.png";
import useHttp from "../../../hooks/use-http";
import { getAuthToken, setAuthDetails } from "../../../util/API/authStorage";

const LogIn = () => {
  const formRef = React.useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = getAuthToken() !== undefined && getAuthToken() !== null;
    // console.log(isLogin, "loh", getAuthToken());
    if (isLogin) {
      // console.log(isLogin, "loh2", getAuthToken());
      navigate(appRoot);
    }
  }, [navigate]);
  const API = useHttp();
  const onFinishFirst = (value) => {
    // console.log(value);
    const payload = {
      email: value.email,
      password: value.password,
    };
    API.sendRequest(
      CONSTANTS.API.login,
      (res) => {
        console.log(res?.token, "abc");
        setAuthDetails(res?.token);
        setLoadings([]);
        // navigate(appRoot);
        window.location.assign(appRoot);
        console.log(
          getAuthToken() !== undefined && getAuthToken() !== null,
          "loh2",
          getAuthToken()
        );
      },
      payload,
      "logIn Successful"
    );

    // notification.success({ message: "Log in ", duration: "2" });
  };
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };
  return (
    <>
      <Row className="form-2" gutter={[0, 4]}>
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
      </Row>
    </>
  );
};
export default LogIn;
