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
  LogoutOutlined,
  MoneyCollectOutlined,
  MoneyCollectTwoTone,
  QuestionCircleOutlined,
  QuestionCircleTwoTone,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import ProjectList from "../pages/projectManagement/projects";

export default function ProjectDashboard({s=false}) {
  let nav = useNavigate();
  const items = [
    {
      icon: <MoneyCollectTwoTone />,
      label: "Projects",
      key: "projects",
      onClick: (e) => {
        nav("Projects");
      },
    },
    {
      icon: <DiffTwoTone />,
      label: "Mailing list",
      key: "mail_list",
      onClick: (e) => {
        nav("mail");
      },
    },
    {
      icon: <LogoutOutlined color="#f00" />,
      label: "Log out",
      key: "community",
      onClick: (e) => {
        nav("elearn");
      },
    },
  ];
  const iitems = [
    {
      icon: <MoneyCollectTwoTone />,
      label: "Projects",
      key: "projects",
      onClick: (e) => {
        nav("Projects");
      },
    },
    {
      icon: <LogoutOutlined color="#f00" />,
      label: "Log out",
      key: "community",
      onClick: (e) => {
        nav("elearn");
      },
    },
  ];
  return (
    <div>
      <Dashboard sideMenuItems={s?iitems:items} />
    </div>
  );
}
