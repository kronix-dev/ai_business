import { Col, Row, Typography } from "antd";
import * as React from "react";
import { dataDisplayItemDto } from "./dto";

export default function DataDisplay({ data }) {
  return (
    <div>
      <Row>
        {data.map((prop, key) => (
          <Col style={prop.style} key={key} xs={prop.grid.xs} sm={prop.grid.sm} md={prop.grid.md}>
            <GetComponent data={prop} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
export function addComponent(
  type,
  label,
  value,
  grid = dataDisplayItemDto.grid,
  childen = dataDisplayItemDto.children,
  style = dataDisplayItemDto.styles,
  showLabel = dataDisplayItemDto.showLabel,
) {
  let x = dataDisplayItemDto;
  x.children = childen;
  x.grid = grid;
  x.value = value;
  x.showLabel = showLabel;
  x.type = type;
  x.label = label;
  x.styles = style
  return x;
}
function GetComponent({ data }) {
  switch (data.type) {
    case "textLabel":
      return <TexTLabel data={data} />;
    default:
      return <></>;
  }
}

function TexTLabel({ data }) {
  return (
    <div>
      <Typography>
        <strong>{data.label}</strong>
      </Typography>
      <Typography>{data.value}</Typography>
    </div>
  );
}
