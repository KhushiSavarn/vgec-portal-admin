import { Button, Col, Form, Image, Input, InputNumber, Row } from "antd";
import { Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import Titler from "../../../component/common/Titler";
import Label from "../../../component/common/Label";
import Logo from "../../../asset/image/M81-Logo-1.png";
import CONSTANTS, { loginRoot } from "../../../util/constant/CONSTANTS";
import useHttp from "../../../hooks/use-http";
const { Text } = Typography;
const Registration = () => {
  const navigate = useNavigate();
  const API = useHttp();
  const formRef = React.useRef(null);
  const [form, setForm] = useState(true);
  const onFinishFirst = (value) => {
    setTimeout(() => {
      console.log(value);
      const payload = {
        ...value,
      };
      API.sendRequest(
        CONSTANTS.API.signUp,
        () => {
          setLoadings([]);
          navigate(loginRoot);
        },
        payload,
        "Register Successful"
      );
    }, 1000);
    setForm(false);
  };
  const formValidator = (test = 1) => {
    const errorsArr = [...formRef.current.getFieldsError()];
    const FieldValidate = [
      "name",
      "email",
      "password",
      "repassword",
      "siteName",
      "plantCapacity",
      "siteLocation",
    ];
    if (test) {
      FieldValidate.splice(4, 3);
    }
    if (
      FieldValidate.map((el) => formRef.current.isFieldTouched(el)).findIndex(
        (el) => el !== true
      ) === -1
    ) {
      if (
        errorsArr.slice(0, 4).findIndex((el) => el.errors.length !== 0) === -1
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      formRef.current.validateFields(FieldValidate);
      return true;
    }
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
    }, 6000);
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
            big={form ? "Get started for free " : "You’re almost done!"}
            small={
              form
                ? "Let’s get started"
                : "Free forever. No credit card needed."
            }
          />
        </Col>
        <Col span={24} className="login-logo">
          <Row align="middle">
            <Col span={6}>
              <Row justify="space-around" align="middle">
                <Col>
                  {form ? (
                    <Button type="primary" shape="circle">
                      1
                    </Button>
                  ) : (
                    <Button
                      shape="circle"
                      type="primary"
                      icon={
                        <CheckOutlined
                        // style={{
                        //   color: "#2E5BFF",
                        // }}
                        />
                      }
                      ghost
                    ></Button>
                  )}
                </Col>
                <Col>
                  <Text
                    style={{
                      color: form ? "#2E5BFF" : "",
                    }}
                    type={!form && "secondary"}
                    strong={true}
                  >
                    User
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify="center">
                <div
                  style={{
                    width: "90%",
                    height: "0.4px",
                    backgroundColor: `${!form ? "#2E5BFF" : "#979797"}`,
                    justifySelf: "center",
                  }}
                ></div>
              </Row>
            </Col>
            <Col span={6}>
              <Row justify="space-around" align="middle">
                <Col>
                  <Button type="primary" shape="circle" disabled={form}>
                    2
                  </Button>
                </Col>
                <Col>
                  <Text
                    style={{
                      color: !form ? "#2E5BFF" : "",
                    }}
                    type={form && "secondary"}
                    strong={true}
                  >
                    Profile
                  </Text>
                </Col>
              </Row>
            </Col>
            {/* <Typography.Text>Ant</Typography.Text> */}
          </Row>
        </Col>
        <Col>
          <Form
            size="medium"
            ref={formRef}
            layout="vertical"
            name="control-ref"
            onFinish={onFinishFirst}
          >
            <div
              style={form ? { display: "block" } : { display: "none" }}
              className="form-2"
            >
              <Label>USERNAME</Label>
              <Form.Item
                name="name"
                className="form"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Valid name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Label>EMAIL</Label>
              <Form.Item
                name="email"
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
              <Label>PASSWORD</Label>
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
                        new Error("Password must be 8 character " + value)
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Label>CONFIRM PASSWORD</Label>
              <Form.Item
                // label="CONFIRM PASSWORD"
                name="repassword"
                className="form"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => {
                    if (!formValidator()) {
                      console.log(formRef.current);
                      setForm((prev) => !prev);
                      console.log(formRef.current.getFieldsError());
                    }
                  }}
                  type="primary"
                  htmlType="button"
                  block
                >
                  NEXT
                </Button>
              </Form.Item>
            </div>
            {/* <div> */}
            <div
              style={!form ? { display: "block" } : { display: "none" }}
              className="form-2"
            >
              <Label>SITE NAME</Label>
              <Form.Item
                // label="SITENAME"
                name="siteName"
                className="form"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Valid site name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Label>SITE LOCATION</Label>
              <Form.Item
                // label="SITELOCATION"
                name="siteLocation"
                className="form"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Valid site location",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Label>PLANT CAPACITY (KWP)</Label>
              <Form.Item
                // label="PLANT CAPACITY (KWP)"
                name="plantCapacity"
                className="form"
                rules={[
                  {
                    required: true,
                    message: "Please Enter valid capacity",
                  },
                  {
                    type: "number",
                    message: "Please Enter valid capacity2",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} controls={false} />
              </Form.Item>
              <Label>Mobile Number</Label>
              <Form.Item
                name="mobile"
                className="form"
                rules={[
                  {
                    required: true,
                    message: "Please Enter valid Mobile Number",
                  },
                  {
                    type: "number",
                    message: "Please Enter valid  Mobile Number",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} controls={false} />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loadings[2]}
                  onClick={() => {
                    if (!formValidator(0)) {
                      enterLoading(2);
                    }
                  }}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Create New Account
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => {
                    setForm(true);
                  }}
                  type="primary"
                  htmlType="button"
                  block
                  ghost
                  icon={<ArrowLeftOutlined />}
                >
                  BACK
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
        <Col
          span={24}
          style={{
            display: "flex",
            width: "150px",
            justifyContent: "space-evenly",
          }}
        >
          Already Have an Account ? <Link to="/">Sign In</Link>
        </Col>
      </Row>
    </>
  );
};

export default Registration;
