import {
  BulbOutlined,
  ClockCircleOutlined,
  FileOutlined,
  LineChartOutlined,
  ManOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import * as React from "react";

export function MentorCard({ data = { score: "5" } }) {
  return (
    <Card style={{ margin: 3 }}>
      <div>
        <Meta
          avatar={<Avatar src="/vite.svg" shape="circle" />}
          title={data.mentor.fname + " " + data.mentor.lname}
          description="Experienced"
        />
        <Divider />
      </div>

      <Space direction="vertical">
        <MentorDataDisplay
          icon={<LineChartOutlined />}
          title={"Experience"}
          value={data.mentor.experience}
        />
        <MentorDataDisplay
          icon={<ClockCircleOutlined />}
          title={"Availability"}
          value={data.mentor.availability.join(", ")}
        />
        <MentorDataDisplay
          icon={<FileOutlined />}
          title={"Qualifications"}
          value={
            data.mentor.qualifications.join(", ")
          }
        />
        <MentorDataDisplay
          icon={<BulbOutlined />}
          title={"Area of expertise"}
          value={data.mentor.area_expert.join(",")}
        />
      </Space>
      <Alert
        style={{ marginBottom: 6 }}
        showIcon
        description={data.reason}
        message={
          <div>
            <Typography>Reason</Typography>
          </div>
        }
      ></Alert>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 70,
          height: 70,
          borderRadius: "50%",
          border: "2px solid #000",
          padding: 10,
          marginBottom: 4,
        }}
      >
        <Row>
          <Col xs={12}></Col>
          <Col xs={24} style={{ textAlign: "center" }}>
            <Typography style={{ fontWeight: "bold", fontSize: 16 }}>
              {data.score}
            </Typography>
            <Typography>Score</Typography>
          </Col>
        </Row>
      </div>
      <div>
        <Button shape="round" type="primary" block>
          Request mentorship
        </Button>
      </div>
    </Card>
  );
}

function MentorDataDisplay({ icon, title, value }) {
  return (
    <Space direction="horizontal" align="start">
      <div style={{ position: "relative", top: 0 }}>{icon}</div>
      <Typography.Paragraph style={{ minWidth: 130 }}>
        <strong>{title}</strong> :
      </Typography.Paragraph>
      <Typography>{value}</Typography>
    </Space>
  );
}
