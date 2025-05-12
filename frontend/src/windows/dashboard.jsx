import React from "react";
import {
  LaptopOutlined,
  LogoutOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Divider, Layout, Menu, Row, theme, Typography } from "antd";
import SideMenu from "../components/menu";
import { Outlet, useNavigate } from "react-router";
import { AuthService } from "../services/auth";
import { useUserContext } from "../controllers/userContext";
const { Header, Content, Sider } = Layout;
const Dashboard = ({ sideMenuItems }) => {
  let nav = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { setUser } = useUserContext();
  React.useEffect(() => {
    AuthService.getUser().then((r) => {
      setUser(r.data);
    });
  }, []);
  return (
    <Layout
      style={{ width: "100%", height: window.innerHeight, overflow: "auto" }}
    >
      <Header style={{ position: "static", borderBottom:"1px solid #888"}}>
        <Row>
          <Col xs={8} md={2}>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flex: 1,
                display: "flex",
              }}
              className="demo-logo"
            >
              <Typography
                style={{ fontSize: 17, fontWeight: "bold", color: "#fff" }}
              >
                Inua Mwanamke
              </Typography>
            </div>
          </Col>
          <Col xs={16} md={9} style={{ width: "100%" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              direction="rtl"
              defaultSelectedKeys={["2"]}
              items={[]}
            />
          </Col>
          <Col md={7}></Col>
          <Col xs={16} md={6} style={{ width: "100%" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              direction="rtl"
              itemType="button"
              defaultSelectedKeys={["2"]}
              items={[
                {
                  icon: <UserOutlined />,
                  label: "My Account",
                  key: "eLearning",
                  onClick: (e) => {
                    nav("account");
                  },
                },

                {
                  icon: <LogoutOutlined color="#f00" />,
                  label: "Logout",
                  key: "community",
                  onClick: (e) => {
                    sessionStorage.setItem("token",null)
                    nav("/");
                  },
                  type: "submenu",
                },
              ]}
            />
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider
          width={300}
          style={{ paddingTop: 10 }}
        >
        <Divider style={{height:2}}/>
          <SideMenu items={sideMenuItems} />
        </Sider>
        <Layout style={{ padding: "0 2px 24px" }}>
          <Content
            style={{
              overflow: "auto",
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
