import { Avatar, Card, Row, Tabs, Col, Typography, Divider, Button } from "antd";
import * as React from "react";
import { useUserContext } from "../../controllers/userContext";
import { ChangePassword } from "../../components/userComponents";
import { BusinessProfile } from "../../components/businessComponents";
import { LockOutlined } from "@ant-design/icons";

export default function AccountPage() {
  const { user } = useUserContext();

  const [showChangePassword,setShowChangePassword] = React.useState(false)
  console.log(user);
  return (
    <div>
      <Row>
        <Col xs={24} md={9}></Col>
        <Col xs={24} md={6}>
          <Card>
            <center>
              <Avatar src="/images/ic1.png" />
              <Typography.Title level={4}>
                {user.fname} {user.lname}
              </Typography.Title>
              <Typography>Project management Account</Typography>
            </center>
            <Divider />
            <Typography>
              <strong>Email Address : </strong>
              {user.email}
            </Typography>
            <Typography>
              <strong>Username : </strong>
              {user.email}
            </Typography>
            <Typography>
              <strong>Address : </strong>
              {user.address}
            </Typography>
            <Button style={{marginTop:20}} onClick={()=>{setShowChangePassword(true)}}><LockOutlined/> Change Password</Button>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          
        </Col>
      </Row>
      <ChangePassword show={showChangePassword} setShow={setShowChangePassword} />
    </div>
  );
}
