import * as React from "react";
import { useRoutes } from "react-router";
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

export default function Routes() {
  return useRoutes([
    { path: "/", element: <LandingPage />, children:[
        {element: <LoginPage/>, path:'login'},
        {element: <SignupPage/>, path:'signup'},
        {element: <ChooseRole/>, path:'default'}
    ] },
    {
      element: <Userdashboard />,
      path: "business_profile",
      children: [
        { element: <BusinessOwnerDashboard />, path: "dashboard" },
        { element: <RevenueList />, path: "revenues" },
        { element: <ExpensesList />, path: "expenses" },
        { element: <BudgetList />, path: "budgets" },
        { element: <MentorshipDashboard />, path: "mentorship" },
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
        { element: <NotFound />, path: "*" },
      ],
    },
    { element: <NotFound />, path: "*" },
  ]);
}
