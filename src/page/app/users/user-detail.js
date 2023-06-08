import React from "react";
import { Card, Col, Row, Tabs } from "antd";

import UserProfile from "./user-profile";
import UserProfileDetails from "./user-profile-detail";
import CONSTANTS from "../../../util/constant/CONSTANTS";
import PreviousBooking from "./tabs/previous-booking";
import CarValet from "./tabs/car-valet";
import Chat from "./tabs/chat";
import UserPost from "./tabs/user-post";
import AboutInfo from "./tabs/about-info";

const UserDetail = () => {
  // , 'valet', 'chat', 'post', 'about'
  const menus = [
    { booking: <PreviousBooking /> },
    { valet: <CarValet /> },
    { chat: <Chat /> },
    { post: <UserPost /> },
    { about: <AboutInfo /> },
  ];

  return (
    <>
      <div className="mt-10">
        <Row gutter={[16, 16]}>
          <Col span={7} xs={24} sm={24} md={24} lg={7} xl={7}>
            <UserProfile />
          </Col>
          <Col span={17} xs={24} sm={24} md={24} lg={17} xl={17}>
            <UserProfileDetails />
          </Col>
        </Row>
        <Card className="mt-10">
          <Tabs
            className="p-0 m-0"
            defaultActiveKey="1"
            size="middle"
            type="card"
            items={CONSTANTS.TAB_MENU.USER.map((ele) => {
              return {
                label: `${ele.Label}`,
                key: `${ele.id}`,
                children: menus.map((data) => {
                  if (Object.keys(data)[0] === ele.id) {
                    return data[ele.id];
                  }
                }),
              };
            })}
          />
        </Card>
      </div>
    </>
  );
};

export default UserDetail;
