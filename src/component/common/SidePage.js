import { Col, Image, Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import DashImg from "../../asset/image/image-dashboard-2.png";
// import DashImg from "../../asset/image/image-Dashboard.png";
// import Logo from "../../asset/image/M81Logo.png";
// import Logo from "../../asset/image/M81-Logo-1.png";
import "../../asset/css/login.css";
const SidePage = () => {
  return (
    <Row align="middle" style={{ userSelect: "none" }}>
      <Col span={12}>
        <Row justify="center">
          <Outlet />
        </Row>
      </Col>
      <Col span={12} style={{ userSelect: "none" }}>
        <Image
          style={{ userSelect: "none" }}
          preview={false}
          src={DashImg}
          height={"100vh"}
          width={"100%"}
        />
      </Col>
    </Row>
  );
};

export default SidePage;
