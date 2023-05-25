import { Outlet, useNavigate } from "react-router-dom";

import { MenuOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Drawer,
  Image,
  Layout,
  Menu,
  Row,
} from "antd";
import Logo from "../../asset/image/M81-Logo-1.png";
import { useEffect, useState } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import data from "../../util/constant/menu";
import CONSTANTS, { loginRoot } from "../../util/constant/CONSTANTS";
import Search from "antd/es/input/Search";
import { IoNotificationsOutline } from "react-icons/io5";
import Profile from "../../asset/image/dummy-avatar.jpg";
import { getAuthToken } from "../../util/API/authStorage";
import useHttp from "../../hooks/use-http";
import { deleteAuthDetails } from "../../util/API/authStorage";

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
  useEffect(() => {
    const isLogin = getAuthToken() !== undefined && getAuthToken() !== null;
    // console.log(isLogin, "Login");
    if (!isLogin) {
      navigate(loginRoot);
    }
  }, [navigate]);
  const [collapsed, setCollapsed] = useState(true);
  const API = useHttp();
  useEffect(() => {
    if (!(getAuthToken() !== undefined && getAuthToken() !== null)) {
      return;
    }
    if (!CONSTANTS.GETMe) {
      API.sendRequest(CONSTANTS.API.getMe, (res) => {
        // console.log(res, "API");
        CONSTANTS.GETMe = res?.data;
        setUserData(res?.data);
      });
    } else {
      setUserData(...CONSTANTS.GETMe);
    }
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
          <div style={{ height: "60px" }}>
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
          </div>
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
              justifyContent: "center",
              flexDirection: "column",
              display: "flex",
            }}
          >
            <Row align="middle" justify="center">
              <Col span={6} className="center flex">
                <Image
                  style={{ height: "55px", width: "70px", background: "black" }}
                  preview={false}
                  src={process.env.REACT_APP_LOGO}
                />
              </Col>
              <Col span={12} style={{ height: "40px" }}>
                <Search className="dashboardSearch" />
              </Col>
              <Col span={6} className="center flex">
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Badge dot>
                    <IoNotificationsOutline
                      size="2em"
                      color="#BFC5D2"
                      display="flex"
                    />
                  </Badge>
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
            {getAuthToken() !== undefined && getAuthToken() !== null && (
              <Outlet />
            )}
          </Content>
        </Layout>
      </Layout>
      {/* <div> */}
      <Drawer
        title="dwd"
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
              className="mt10"
              src={Profile}
            >
              <div style={{ fontWeight: "400", fontSize: "2rem" }}>
                {/* {UserData.fullname.split(" ")[0].charAt(0).toUpperCase()} */}
              </div>
            </Avatar>
            <div className="an-24 regular-text mt20">{UserData?.name}</div>
            {/* <div className="an-24 regular-text mt20">{UserData?.siteName}</div> */}
            <div className="an-14 regular-text gray--text">
              {UserData?.role}
            </div>
            <Button
              danger
              htmlType="submit"
              className="an-14 medium-text mt20 br5"
              style={{ width: "160px", height: "40px" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
        <hr className="my30" style={{ background: "#E4E8F0" }} />
        <div>
          {/* <div className="an-12 medium-text gray--text mt25">NAME</div>
              <div className="an-15 regular-text mt5 ">{UserData?.username}</div> */}
          {/* <div className="an-12 medium-text gray--text mt25">ROLE</div>
              <div className="an-15 regular-text mt5">{UserData?.role}</div> */}
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
        </div>
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
