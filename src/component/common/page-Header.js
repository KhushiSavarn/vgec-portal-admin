import { FilterOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React from "react";

import CustomButton from "./Custom-Buttons";
const PageHeader = ({ data }) => {
  const paramas = window.location.pathname;
  return (
    <Col span={24}>
      <Row className="container-head">
        <Col span={24} className="dashboard-headers">
          <Row>
            <p className="dashboard-head capitlize">
              {paramas.split("/").length < 4
                ? paramas.split("/")[2]
                : `${paramas.split("/")[2]} ${data?.name && "|" + data?.name}`}
            </p>
          </Row>
          <Row>
            {data?.buttons.map((button) => (
              <CustomButton key={button.id} {...button} />
            ))}
          </Row>
        </Col>
        {/* {search && (
          <Col span={12} className="dashboard-headers">
            <Row>
              <Search placeholder="Search" />
            </Row>
            <Row>
              <Col span={12}>
      
              </Col>
              <Col
                span={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Row justify="end" align="middle">
                  <Col className="pages" span={8}>
                    {`${search?.page?.total ? search?.page?.start : 0}-${
                      search?.page?.end
                    } / ${search?.page?.total}`}
                  </Col>
                  <Col className="carasoul-btn pages" span={8}>
                    <Row align="middle">
                      <Col span={12}>
                        <LeftOutlined onClick={search?.action?.left} />
                      </Col>
                      <Col span={12}>
                        <RightOutlined onClick={search?.action?.right} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        )} */}
      </Row>
    </Col>
  );
};

PageHeader.defaultProps = {
  search: null,
  data: {
    buttons: [],
    name: "",
  },
  details: "",
};

export default PageHeader;
