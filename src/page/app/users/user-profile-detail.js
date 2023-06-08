import React from "react";
import { Card, Col, Row } from "antd";

const UserProfileDetails = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card size="small" className="py-2 px-4">
          <div>
            <p className="font-semibold text-lg text-slate-400">Visit Place</p>
            <p className=" text-xl font-medium">12</p>
          </div>
        </Card>
      </Col>
      <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card size="small" className="py-2 px-4">
          <div>
            <p className="font-semibold  text-lg text-slate-400">
              Follow Request
            </p>
            <p className=" text-xl font-medium">12</p>
          </div>
        </Card>
      </Col>
      <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card size="small" className="py-2 px-4">
          <div>
            <p className="font-semibold text-lg text-slate-400">Block User</p>
            <p className=" text-xl font-medium">12</p>
          </div>
        </Card>
      </Col>
      <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card size="small" className="py-2 px-4">
          <div>
            <p className="font-semibold text-lg text-slate-400">Invite List</p>
            <p className=" text-xl font-medium">12</p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UserProfileDetails;
