import * as React from "react";
import Dashboard from "./dashboard";
import {
  BookOutlined,
  DashboardFilled,
  DashOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

export default function Mentordashboard() {
  let nav = useNavigate();
  const items = [
    {
      icon: <DashboardFilled />,
      label: "Dashboard",
      key: "dashboard",
      onClick: (e) => {
        nav("dashboard");
      },
    },
    {
      icon: <UsergroupAddOutlined />,
      label: "Mentee",
      key: "mentee",
      onClick: (e) => {
        nav("mentee");
      },
    },
    {
      icon: <UserAddOutlined />,
      label: "Mentorship Requests",
      key: "menteereq",
      onClick: (e) => {
        nav("requests");
      },
    },
    {
      icon: <BookOutlined />,
      label: "eLearning",
      key: "eLearning",
      onClick: (e) => {
        nav("elearn");
      },
    },
  ];
  return (
    <div>
      <Dashboard sideMenuItems={items} />
    </div>
  );
}
