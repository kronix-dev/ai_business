import * as React from "react";
import { Navigate, useRoutes } from "react-router";
import Mentordashboard from "../windows/mentordashboard";
import RevenueList from "../pages/pos/revenuesList";
import Userdashboard from "../windows/userdashboard";
import ExpensesList from "../pages/pos/expensesList";
import NotFound from "../pages/default/NotFound";
import FindMentor from "../pages/mentorship/FindMentor";
import LoginPage from "../pages/landing/login";
import LandingPage from "../windows/landing";
import SignupPage from "../pages/landing/signup";
import ChooseRole from "../pages/landing/chooseRole";
import BudgetList from "../pages/pos/budgetList";
import BusinessOwnerDashboard from "../pages/dashboard/businessDashboard";
import MyMentors from "../pages/mentorship/mymentors";
import MentorshipDashboard from "../pages/mentorship/mentorshipDashboard";
import MentorDashboardPage from "../pages/dashboard/mentorDashboard";
import MenteeList from "../pages/mentorship/menteeList";
import ProjectDashboard from "../windows/projectDashboard";
import ProjectList from "../pages/projectManagement/projects";
import MailList from "../pages/projectManagement/mailList";
import AccountPage from "../pages/user/account";
import TopicList from "../pages/forum/topicList";
import TopicPage from "../pages/forum/topicView";
import MentorRequest from "../pages/mentorship/requests";
import ProjectListReadOnly from "../pages/projectManagement/projects_view_only";
import Materials from "../pages/elearning/materials";
import CreatorPanel from "../pages/elearning/creatorpanel";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
      children: [
        { element: <Navigate to={"login"} />, path: "/" },
        { element: <LoginPage />, path: "login" },
        { element: <SignupPage />, path: "signup" },
        { element: <ChooseRole />, path: "default" },
      ],
    },
    {
      element: <Userdashboard />,
      path: "business_profile",
      children: [
        { element: <BusinessOwnerDashboard />, path: "dashboard" },
        { element: <RevenueList />, path: "revenues" },
        { element: <ExpensesList />, path: "expenses" },
        { element: <BudgetList />, path: "budgets" },
        { element: <MentorshipDashboard />, path: "mentorship" },
        { element: <TopicList />, path: "forum" },
        { element: <TopicPage />, path: "forum/topic/:topic" },
        { element: <Materials />, path: "elearning/materials" },
        { element: <AccountPage />, path: "account" },
        { element: <NotFound />, path: "*" },
      ],
    },
    {
      path: "project_management",
      element: <ProjectDashboard />,
      children: [
        { element: <ProjectList />, path: "projects" },
        { element: <AccountPage />, path: "account" },
        { element: <MailList />, path: "mail" },
        { element: <NotFound />, path: "*" },
      ],
    },
    {
      path: "project_management_view",
      element: <ProjectDashboard s={true} />,
      children: [
        { element: <ProjectListReadOnly />, path: "projects" },
        { element: <AccountPage />, path: "account" },
        { element: <NotFound />, path: "*" },
      ],
    },
    {
      element: <Mentordashboard />,
      path: "mentor_profile",
      children: [
        { element: <MentorDashboardPage />, path: "dashboard" },
        { element: <RevenueList />, path: "revenues" },
        { element: <MenteeList />, path: "mentee" },
        { element: <CreatorPanel />, path: "elearning" },
        { element: <MentorRequest />, path: "requests" },
        { element: <NotFound />, path: "*" },
      ],
    },
    { element: <NotFound />, path: "*" },
  ]);
}
