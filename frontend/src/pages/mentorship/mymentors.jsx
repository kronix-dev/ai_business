import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import * as react from "react";
import { MentorCard } from "./mentorComponents";

export default function MyMentors() {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <Typography.Title level={4}>My Mentors</Typography.Title>
        </Col>
        <Col xs={12}>
          <Button shape="rounded" style={{ float: "right" }} type="primary">
            <SearchOutlined />
            &nbsp;Find mentor
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={8} sm={12}>
            <MentorCard/>
        </Col>
      </Row>
    </div>
  );
}
