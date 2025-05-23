import { Col, Row, Typography } from "antd";
import * as React from "react";
import KForm from "../../components/form";
import { useNavigate } from "react-router";
import { AuthService } from "../../services/auth";
import { useUserContext } from "../../controllers/userContext";

export default function LoginPage() {
  const loginForm = [
    { type: "email", placeholder: "Email address",name:"username" },
    { type: "password", placeholder: "Password",name:"password" },
  ];
  const nav = useNavigate()
  const {setUser} = useUserContext()
  const login = (data)=>{
    AuthService.login(data.username,data.password).then((r)=>{
      console.log(r)
      if(r){
        AuthService.getUser().then((r)=>{
          setUser(r.data)
          nav('/'+r.data.group[0])
        })
      }
    })
  }
  return (
    <div style={{}}>
      <Row>
        <Col sm={12} md={12} xs={12}>
          <div
            style={{
              height: window.innerHeight,
              width: "100%",
              backgroundImage:'url(/images/login.png)',
              backgroundSize:"cover",
              position:"relative",
              display:"flex",
              flex:1
            }}
          >
            <h1 style={{margin:"auto"}}>Welcome to Inua Mwanamke</h1>
            <div>

            </div>
          </div>
        </Col>
        <Col sm={12} md={12} xs={24} style={{ margin: "auto" }}>
          <div style={{ padding: "25%", paddingTop:"20%" }}>
        <center>

        <img src="/vite.svg" style={{margin:"auto"}}/>
        <Typography.Title level={3}>Inua Mwanamke</Typography.Title>
        </center>
            <KForm showSubmitButton submitText="Sign in" showLabels={true} form={loginForm} onSubmit={login}/>
            <center>
                <Typography.Paragraph>
                I dont have an account
                <a href="#" onClick={()=>{nav('/signup')}}> Sign up</a>
                </Typography.Paragraph>
            </center>
          </div>
        </Col>
      </Row>
    </div>
  );
}
