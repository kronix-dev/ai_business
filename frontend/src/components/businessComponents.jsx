import { Col, Row, Typography,Button } from "antd";
import * as React from "react";
import { useUserContext } from "../controllers/userContext";

export function BusinessProfile() {
  const { user } = useUserContext();
  const items = [
    {
      value: "asd",
      placeHolder: "Business name",
      grid: {
        xs: 24,
        sm: 12,
        md: 6,
      },
    },
    {
      value: "asd",
      placeHolder: "Business size",
      grid: {
        xs: 24,
        sm: 12,
        md: 6,
      },
    },
    {
      value: "asd",
      placeHolder: "Industry",
      grid: {
        xs: 24,
        sm: 12,
        md: 6,
      },
    },
    {
      value: "asd",
      placeHolder: "Monthly reevenue",
      grid: {
        xs: 24,
        sm: 12,
        md: 6,
      },
    },
    {
      value: "sad",
      placeHolder: "Business Goals",
      grid: {
        xs: 24,
        sm: 12,
        md: 12,
      },
    },
  ];
  return (
    <div>
      <Row>
        {items.map((prop) => (
          <Col xs={prop.grid.xs} md={prop.grid.md} sm={prop.grid.sm}>
            <Typography>
              <strong>{prop.placeHolder}</strong>
            </Typography>
            {prop.value}
          </Col>
        ))}
      </Row>
      <Button type="primary" style={{marginTop:20}}>Edit Business details</Button>
    </div>
  );
}
