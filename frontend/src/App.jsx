import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RevenueList from "./pages/pos/revenuesList";
import { ConfigProvider, notification } from "antd";
import MentorDashboard from "./windows/mentordashboard";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Routes from "./controllers/routes";
import { AppUserContext } from "./controllers/userContext";
import { Loader } from "./components/loader";
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <AppUserContext>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#2f6ee3",
              borderRadius: 15,

              // Alias Token

              colorBgContainer: "#fff",
            },
          }}
        >
          <div>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </div>
          <Loader/>
        </ConfigProvider>
      </AppUserContext>
    </>
  );
}

export default App;
