import React from "react";
import {
  DashboardOutlined,
  LaptopOutlined,
  MessageOutlined,
  NotificationOutlined,
  SendOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Layout,
  Menu,
  Row,
  Space,
  Tag,
  theme,
  Typography,
} from "antd";
import { Outlet } from "react-router";
import SideMenu from "../../components/menu";
import KForm from "../../components/form";
import TextArea from "antd/es/input/TextArea";
import FindMentor from "./FindMentor";
const { Header, Content, Sider } = Layout;
const MentorshipDashboard = ()=>{

  return(
    <div>
      <FindMentor/>
      {/* <DashboardView/> */}
    </div>
  )
}
const DashboardView = ({}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      icon: <DashboardOutlined />,
      label: "Dashboard",
      key: "dashboard",
      onClick: (e) => {
        nav("mentee");
      },
    },
    {
      icon: <MessageOutlined />,
      label: "Chat",
      key: "chat",
      onClick: (e) => {
        nav("dashboard");
      },
    },
    {
      icon: <SettingOutlined />,
      label: "Settings",
      key: "settings",
      onClick: (e) => {
        nav("dashboard");
      },
    },
  ];
  return (
    <Row>
      <Col xs={24} md={4}>
        <SideMenu items={items} />
      </Col>
      <Col xs={24} md={20}>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                paddingTop: 6,
                paddingBottom: 6,
                paddingRight: 16,
                paddingLeft: 16,
                borderRadius: 20,
              }}
            >
              <Card size="small">
                <Typography>Hello</Typography>
              </Card>
            </div>
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                paddingTop: 6,
                paddingBottom: 6,
                paddingRight: 16,
                paddingLeft: 16,
                borderRadius: 20,
              }}
            >
              <Tag style={{borderTopLeftRadius:0}} title="Hello" color="success">
              
                <Typography style={{padding:10}}>Hello</Typography>
              </Tag>
              {/* </Card> */}
            </div>
          </div>
        </Content>
          <Space style={{width:"100%"}} size={"large"}>
            <Space.Compact style={{width:"100%"}}>
              <Input />
              <Button type="primary">
                <SendOutlined />    
              </Button>
            </Space.Compact>
          </Space>
      </Col>
    </Row>
  );
};
export default MentorshipDashboard;
