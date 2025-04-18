import { Layout } from "antd";
import * as React from "react";
import { Outlet } from "react-router";
import API from "../controllers/api";

export default function LandingPage() {
  React.useEffect(()=>{
    API.login("default_user","fanyaWewe")
  },[])
  return (
    <div>
      <Layout style={{ width: "100%", height: window.innerHeight }}>
        <Outlet />
      </Layout>
    </div>
  );
}
