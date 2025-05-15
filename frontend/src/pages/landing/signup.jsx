import { Col, Row, Typography } from "antd";
import * as React from "react";
import KForm from "../../components/form";
import { useNavigate } from "react-router";
import { AuthService } from "../../services/auth";

export default function SignupPage() {
  
  const signupForm = [
    {
      type: "row",
      children: [
        {
          type: "text",
          placeholder: "First name",
          name: "fname",
          grid: { sm: 12, md: 12 },
        },
        {
          type: "text",
          placeholder: "Last name,",
          name: "lname",
          grid: { sm: 12, md: 12 },
        },
      ],
    },
    { type: "email", placeholder: "Email address", name: "email" },
    { type: "password", placeholder: "Password", name: "password" },
  ];
  const nav = useNavigate();
  const signUp = (dat) => {
    AuthService.signUp(dat).then((r) => {
      alert("Your account has been created successfully, Proceed to sign in")
      nav('/login')
    });
  };
  return (
    <div style={{}}>
      <Row>
        <Col sm={12} md={12} xs={12}>
          <div
            style={{
              height: window.innerHeight,
              width: "100%",
              backgroundImage: "url(/images/login.png)",
              backgroundSize: "cover",
              position: "relative",
              display: "flex",
              flex: 1,
            }}
          >
            <h1 style={{ margin: "auto", marginLeft: 10 }}>Get Started</h1>
            <div></div>
          </div>
        </Col>
        <Col sm={12} md={12} xs={24} style={{ margin: "auto" }}>
          <div style={{ padding: "25%", paddingTop: "20%" }}>
            <center>
              <img src="/vite.svg" style={{ margin: "auto" }} />
              <Typography.Title level={3}>Tanroads Kigoma</Typography.Title>
            </center>
            <KForm
              onSubmit={signUp}
              showSubmitButton
              showLabels={true}
              form={signupForm}
              submitText="Sign up"
            />
            <center>
              <Typography.Paragraph style={{ marginTop: 30 }}>
                I have an account
                <a
                  href="#"
                  onClick={() => {
                    nav("/login");
                  }}
                >
                  {" "}
                  Sign in
                </a>
              </Typography.Paragraph>
            </center>
          </div>
        </Col>
      </Row>
    </div>
  );
}
