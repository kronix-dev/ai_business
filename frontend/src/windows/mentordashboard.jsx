import * as React from "react";
import Dashboard from "./dashboard";
import { BookOutlined, DashboardFilled, DashOutlined, QuestionCircleOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
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
        key: "mentee",
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
    {
      icon: <UserOutlined />,
      label: "Mentorship Profile ",
      key: "user",
      onClick: (e) => {
        nav("user");
      },
    },
    {
        icon: <QuestionCircleOutlined />,
        label: "FAQ ",
        key: "faq",
        onClick: (e) => {
          nav("user");
        },
      },
  ];
  return (
    <div>
      <Dashboard sideMenuItems={items} />
    </div>
  );
}
