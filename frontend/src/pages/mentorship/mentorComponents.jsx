import { BulbOutlined, ClockCircleOutlined, FileOutlined, LineChartOutlined, ManOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Space, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import * as React from "react";

export function MentorCard({ data }) {
  return (
    <Card>
      <div>
        <Meta
          avatar={<Avatar src="/vite.svg" shape="circle"/>}
          title="Hassan Said"
      
          description="Experienced"
        />
        <Divider />
      </div>
      <Space direction="vertical">
        <MentorDataDisplay
          icon={<LineChartOutlined />}
          title={"Experience"}
          value={"7 years"}
        />
        <MentorDataDisplay
          icon={<ClockCircleOutlined />}
          title={"Availability"}
          value={"Weekdays"}
        />
        <MentorDataDisplay
          icon={<FileOutlined />}
          title={"Qualifications"}
          value={
            "Bachelor of Science in BIS, Bachelor of Science in Law, PHD in Psychology"
          }
        />
        <MentorDataDisplay
          icon={<BulbOutlined />}
          title={"Area of expertise"}
          value={"Sales, Marketing, Human resource, Engineering"}
        />
      </Space>
      <div>
        <Button shape="round" type="primary" block>Request mentorship</Button>
      </div>
    </Card>
  );
}

function MentorDataDisplay({ icon, title, value }) {
  return (
    <Space direction="horizontal" align="start">
      <div style={{ position: "relative", top: 0 }}>{icon}</div>
      <Typography.Paragraph style={{minWidth:130}}>
        <strong>{title}</strong> :
      </Typography.Paragraph>
      <Typography>{value}</Typography>
    </Space>
  );
}
