import React from "react";
import {
  ArrowLeftOutlined,
  BackwardOutlined,
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
  FloatButton,
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
import MentorList from "./mentorList";
import Chatbox from "../../components/chatbox";
const { Header, Content, Sider } = Layout;
const MentorshipDashboard = () => {
  const [view, setView] = React.useState("");
  const [mentor, setItem] = React.useState("");
  return (
    <div>
      {view === "find" ? (
        <FindMentor setView={setView} />
      ) : view === "message" ? (
        <MentorshipMessaging setView={setView} mentor={mentor} />
      ) : (
        <MentorList setView={setView} setItem={setItem} />
      )}
    </div>
  );
};
const MentorshipMessaging = ({ setView, mentor }) => {
  return (
    <Row>
      <Col xs={24} md={7}>
        <Button
          onClick={() => {
            setView("");
          }}
          icon={<ArrowLeftOutlined />}
          shape="circle"
          type="primary"
        />
      </Col>
      <Col xs={24} md={10}>
        <Chatbox userName={mentor.fullName} chatHeight={window.innerHeight*0.68} userId={mentor.userId} />
      </Col>
    </Row>
  );
};
export default MentorshipDashboard;
