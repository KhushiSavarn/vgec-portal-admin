import { Outlet, useNavigate } from "react-router-dom";

import { MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Drawer, Image, Layout, Menu, Row } from "antd";
import { useEffect, useState } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import data from "../../util/constant/menu";
import CONSTANTS, { loginRoot } from "../../util/constant/CONSTANTS";
import Profile from "../../asset/image/dummy-avatar.jpg";
import { getAuthToken } from "../../util/API/authStorage";
import { deleteAuthDetails } from "../../util/API/authStorage";
import logo from "../../asset/logos/icon.svg";
import useHttp from "../../hooks/use-http";

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  ...data.map((el) =>
    getItem(
      el.label,
      `/app/${el.id}`,
      el.icon,
      el.subMenu &&
        el.subMenu.map((elp) =>
          getItem(elp.label, `/app/${el.id}/${elp.id}`, elp.icon)
        )
    )
  ),
];
const AppLayout = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [UserData, setUserData] = useState({});
  // useEffect(() => {
  // const isLogin = getAuthToken() !== undefined && getAuthToken() !== null;
  // console.log(isLogin, "Login");
  // navigate(loginRoot);

  // if (!isLogin) {
  // }
  // }, [navigate]);
  const [collapsed, setCollapsed] = useState(true);
  const api = useHttp();
  useEffect(() => {
    if (!(getAuthToken() !== undefined && getAuthToken() !== null)) {
      navigate(loginRoot)
      return;
    }
    if (!CONSTANTS.GETMe) {
      api.sendRequest(CONSTANTS.API.getMe, (res) => {
        // console.log(res, "API");
        CONSTANTS.GETMe = res?.data?.admin;
        setUserData(res?.data?.admin);
      });
    }
    // } else {
    //   setUserData(...CONSTANTS.GETMe);
    // }
  }, []);
  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleLogout = () => {
    deleteAuthDetails();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Layout
        hasSider={true}
        style={{
          minHeight: "100vh",
          userSelect: "none",
        }}
      >
        <Sider
          trigger={null}
          // style={{
          //   overflow: "hidden",
          //   overflowY: "scroll",
          //   maxHeight: "100vh",
          // }}
          theme="light"
          collapsible
          collapsed={collapsed}
        >
          <div
            style={{
              display: "flex",
              height: "64px",
              paddingLeft: "30px",
              alignItems: "center",
            }}
          >
            <Icon
              style={{ fontSize: "20px" }}
              component={MenuOutlined}
              onClick={toggleCollapsed}
            ></Icon>
          </div>
          {/* <div style={{ height: "60px" }}>
            <Row
              justify="center"
              style={{
                opacity: Object.keys(UserData).length ? (collapsed ? 0 : 1) : 0,
                transition: "all 1s ease-in",
              }}
            >
              <Col span={6} style={{ display: collapsed ? "none" : "" }}>
                <Avatar src={Profile} size={35} shape="square" />
              </Col>
              <Col span={12} style={{ display: collapsed ? "none" : "" }}>
                <Row>
                  <p className="profile-head">Welcome</p>
                </Row>
                <Row
                  style={{
                    opacity: Object.keys(UserData).length
                      ? collapsed
                        ? 0
                        : 1
                      : 0,
                    transition: "all 1s ease-in",
                  }}
                >
                  <p className="profile-sub">{UserData?.name}</p>
                </Row>
              </Col>
            </Row>
          </div> */}
          <Menu
            defaultSelectedKeys={window.location.pathname}
            activeKey=""
            mode="inline"
            items={items}
            onClick={(e) => {
              console.log(e);
              if (e.keyPath.length) {
                navigate(e.key);
              }
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              backgroundColor: "#FFFFFF",
              justifyContent: "space-between",
              flexDirection: "column",
              display: "flex",
            }}
          >
            <Row
              align="middle"
              justify="space-between"
              style={{ padding: "0px 35px" }}
            >
              <Col span={6} className="center flex">
                <Image
                  style={{ height: "55px", width: "70px" }}
                  preview={false}
                  src={logo}
                />
              </Col>
              {/* <Col span={12} style={{ height: "40px" }}>
                <Search className="dashboardSearch" />
              </Col> */}
              <Col
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  {/* <Badge dot>
                    <IoNotificationsOutline
                      size="2em"
                      color="#BFC5D2"
                      display="flex"
                    />
                  </Badge> */}
                  <Avatar
                    src={Profile}
                    size={35}
                    style={{
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setVisible(true);
                    }}
                  />
                </Col>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Outlet />

            {/* {getAuthToken() !== undefined && getAuthToken() !== null && (
              <Outlet />
            )} */}
          </Content>
        </Layout>
      </Layout>
      {/* <div> */}
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <div className="flex-x center text-center profile-drawer">
          <div>
            <Avatar
              size={100}
              style={{ color: "#fffff", backgroundColor: "#000000" }}
              className="mt-10"
              src={Profile}
            >
              <div style={{ fontWeight: "400", fontSize: "2rem" }}>
                {/* {UserData.fullname.split(" ")[0].charAt(0).toUpperCase()} */}
              </div>
            </Avatar>
            <div className="mt-5 text-2xl font-medium">
              {UserData?.name || "Website Admin"}
            </div>
            {/* <div className="an-24 regular-text mt20">{UserData?.siteName}</div> */}
            <div className="text-slate-500">
              {UserData?.email || "admin@test.com"}
            </div>
            <Button
              danger
              htmlType="submit"
              className="mt-5 w-40 h-10"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
        <hr className="my30" style={{ background: "#E4E8F0" }} />
        {/* <div>
          <div className="an-12 medium-text gray--text mt25">NAME</div>
          <div className="an-15 regular-text mt5 ">{UserData?.username}</div>
          <div className="an-12 medium-text gray--text mt25">ROLE</div>
          <div className="an-15 regular-text mt5">{UserData?.role}</div>
          <div className="an-12 medium-text gray--text mt25">EMAIL</div>
          <div className="an-15 regular-text mt5">{UserData?.email}</div>
          <div className="an-12 medium-text gray--text mt25">
            {UserData?.siteName && "SITE NAME"}
          </div>
          <div className="an-15 regular-text mt5">{UserData?.siteName}</div>
          <div className="an-12 medium-text gray--text mt25">
            {UserData?.role && "ROLE"}
          </div>
          <div className="an-15 regular-text mt5">{UserData?.role}</div>
          <div className="an-12 medium-text gray--text mt25">
            {UserData?.mobile && "PHONE"}
          </div>
          <div className="an-15 regular-text mt5">{UserData?.mobile}</div>
        </div> */}
        {/* <div>
          <span
            style={{ cursor: "pointer" }}
            className="an-34 mt5 logo-text flex-x center"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="m81Logo" height="50" />
          </span>
          <p className="an-14 slogan-text text-center mb0">M-81 ERP</p>
        </div> */}
      </Drawer>
      {/* </div> */}
    </>
  );
};

export default AppLayout;
