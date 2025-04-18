import { Avatar, Col, Row, Typography } from "antd";
import * as React from "react";

export default function TopicList() {
  return <div></div>;
}

export function TopicCard({title,paragraph,id}) {
    
  return (
    <div>
      <Row>
        <Col>
          <Avatar />
        </Col>
        <Col>
            <Typography.Title>{title}</Typography.Title>
            <Typography.Paragraph>{paragraph}</Typography.Paragraph>
        </Col>
      </Row>
    </div>
  );
}
