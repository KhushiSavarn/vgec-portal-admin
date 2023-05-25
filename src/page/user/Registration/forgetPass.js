import { Button, Col, Form, Image, Input, Row } from "antd";
import React, { useState } from "react";
import { Typography } from "antd";
import Logo from "../../../asset/image/M81-Logo-1.png";
import Label from "../../../component/common/Label";
import { loginRoot } from "../../../util/constant/CONSTANTS";
import { Link } from "react-router-dom";
const { Text } = Typography;
const ForgetPassword = () => {
  const formRef = React.useRef(null);
  const onClickButton = (values) => {
    setTimeout(() => {
      console.log(values);
      setLoadings([]);
    }, 1000);
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
    <Row className="forget-screen">
      <Col span={24} className="image-forget">
        <Image preview={false} src={Logo} />
      </Col>
      <Col span={6}></Col>
      <Col span={12}>
        <Row className="forget-modal">
          <Col span={24} className="forget-form">
            <Row
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="heading2">Forgot Password?</p>
              <Text className="sub-heading2" type="secondary" strong={true}>
                We get it, stuff happens. Just enter your email address below
                and we’ll send you a link to reset your password!
              </Text>
            </Row>
            <Row justify="center" style={{ marginTop: "25px" }}>
              <Form
                size="medium"
                style={{
                  width: "80%",
                }}
                ref={formRef}
                layout="vertical"
                name="control-ref"
                onFinish={onClickButton}
              >
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
                  <Input
                    placeholder="Enter Email Address or Username"
                    className="alpha"
                  />
                </Form.Item>
                <Form.Item>
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
                    Reset Password
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
                <Label>Already have an account?</Label>
                <Link to={loginRoot}>Sign in</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ForgetPassword;
