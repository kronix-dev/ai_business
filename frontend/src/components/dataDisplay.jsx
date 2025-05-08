import { Col, Row, Typography } from "antd";
import * as React from "react";
import { dataDisplayItemDto } from "./dto";
import KModal from "./modal";
import KTable from "./table";

export default function DataDisplay({ data }) {
  return (
    <div>
      <Row>
        {data.map((prop, key) => (
          <Col key={key} xs={prop.grid.xs} sm={prop.grid.sm} md={prop.grid.md}>
            <div style={prop.styles}>
              <GetComponent data={prop} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export function DataDisplayModal({
  data,
  setOpen = () => {},
  open,
  showCancel,
  okText,
  title,
  onOk,
  containerWidth,
}) {
  return (
    <div>
      <KModal
        setOpen={setOpen}
        open={open}
        showCancel={showCancel}
        okText={okText}
        title={title}
        onOk={onOk}
        containerWidth={containerWidth}
      >
        <DataDisplay data={data} />
      </KModal>
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
  showLabel = dataDisplayItemDto.showLabel
) {
  let x = dataDisplayItemDto;
  x.children = childen;
  x.grid = grid;
  x.value = value;
  x.showLabel = showLabel;
  x.type = type;
  x.label = label;
  x.styles = style;
  return x;
}
function GetComponent({ data }) {
  switch (data.type) {
    case "textLabel":
      return <TexTLabel data={data} />;
    case "table":
        return <KTable showCreate={data.value.showCreate} minHeight={"unset"} showHeader={true} columns={data.value.columns} rows={data.value.rows} tableMenu={data.tableMenu} />
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

function TableView({ data }) {}
