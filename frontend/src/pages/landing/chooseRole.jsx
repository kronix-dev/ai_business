import { Button, Card, Col, Row, Typography } from "antd";
import * as react from "react";
import { AuthService } from "../../services/auth";
import { useNavigate } from "react-router";
export default function ChooseRole() {
  const nav =useNavigate()
  const updateRole = (role)=>{
    AuthService.updateGroup({role}).then((r)=>{
      if(r.status){
        nav('/'+role)
      }
    })
  }
  return (
    <div style={{ margin: "auto" }}>
      <Row >
        <Col xs={24}>
          <Typography.Title style={{textAlign:"center"}} level={4}>How would you like to use our platform?</Typography.Title>
        </Col>
        <Col sm={8} offset={4}>
          <Card
           cover={
            <img src="/images/ic1.png"/>
           }
          >
            <center>
            <Typography.Title level={5}>Business owner</Typography.Title>
            <Button onClick={()=>{updateRole('business_profile')}} type="primary">Get Started</Button>
            </center>
          </Card>
        </Col>
        <Col style={{marginRight:8}} offset={1} sm={8}>
        <Card
           cover={
            <img src="/images/ic2.png"/>
           }
          >
            <center>
            <Typography.Title level={5}>Mentor</Typography.Title>
            <Button onClick={()=>{updateRole('mentor_profile')}} type="primary">Get Started</Button>
            </center>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
