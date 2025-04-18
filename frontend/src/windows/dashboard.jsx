import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Layout, Menu, Row, theme } from "antd";
import SideMenu from "../components/menu";
import { Outlet } from "react-router";
const { Header, Content, Sider } = Layout;
const Dashboard = ({ sideMenuItems }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{ width: "100%", height: window.innerHeight, overflow: "auto" }}
    >
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Row>
          <Col xs={8} md={4}>
            <div className="demo-logo">
              <img src="/vite.svg" />
            </div>
          </Col>
          <Col xs={16} md={20} style={{width:"100%"}}>
            <Menu
              theme="dark"
              mode="horizontal"
              direction="rtl"
              defaultSelectedKeys={["2"]}
              items={sideMenuItems}
              style={{ flex: 1, minWidth: 0, float:"right", }}
            />
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider
          width={300}
          style={{ background: colorBgContainer, paddingTop: 10 }}
        >
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
