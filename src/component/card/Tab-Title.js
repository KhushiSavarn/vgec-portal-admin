import { Col, Row } from "antd";
import React from "react";

const TabTitle = (prop) => {
  return (
    <Row className="dashboard-head-tab">
      <Col span={6} className="tab-text" style={{ fontSize: "24px" }}>
        {prop.icon}
      </Col>
      <Col span={16} className="tab-text">
        {prop.name}
      </Col>
    </Row>
  );
};

export default TabTitle;
