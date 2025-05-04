import * as React from "react";
import Dashboard from "./dashboard";
import {
  BookOutlined,
  BookTwoTone,
  DashboardFilled,
  DashboardTwoTone,
  DashOutlined,
  DiffOutlined,
  DiffTwoTone,
  GlobalOutlined,
  MoneyCollectOutlined,
  MoneyCollectTwoTone,
  QuestionCircleOutlined,
  QuestionCircleTwoTone,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

export default function Userdashboard() {
  let nav = useNavigate();
  const items = [
    {
      icon: <DashboardTwoTone />,
      label: "Dashboard",
      key: "dashboard",
      onClick: (e) => {
        nav("dashboard");
      },
    },
    {
      icon: <MoneyCollectTwoTone />,
      label: "Revenues",
      key: "revenues",
      onClick: (e) => {
        nav("revenues");
      },
    },
    {
      icon: <MoneyCollectTwoTone />,
      label: "Expenses",
      key: "expenses",
      onClick: (e) => {
        nav("expenses");
      },
    },
    {
      icon: <DiffTwoTone />,
      label: "Budgeting",
      key: "budgets",
      onClick: (e) => {
        nav("budgets");
      },
    },
    {
      icon: <BookTwoTone />,
      label: "Mentorship",
      key: "mentrorship",
      onClick: (e) => {
        nav("mentorship");
      },
    },
    {
      icon: <BookTwoTone />,
      label: "eLearning",
      key: "eLearning",
      onClick: (e) => {
        nav("elearn");
      },
    },
    {
      icon: <QuestionCircleTwoTone />,
      label: "FAQ ",
      key: "faq",
      onClick: (e) => {
        nav("user");
      },
    },
    {
      icon: <GlobalOutlined color="#f00" />,
      label: "Community",
      key: "community",
      onClick: (e) => {
        nav("forum");
      },
    },
  ];
  return (
    <div>
      <Dashboard sideMenuItems={items} />
    </div>
  );
}
