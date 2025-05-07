import * as React from "react";
import { Button, Col, Input, Row, Select, Space, Table, Tooltip } from "antd";
import { DotChartOutlined, SearchOutlined } from "@ant-design/icons";
export default function KTable({
  columns = [],
  hoverable = true,
  showHeader = true,
  rows = [],
  buttonText = "Create new",
  onButtonClick = () => {},
  SearchComponent = ({ setCol, setSearch }) => (
    <Space direction="horizontal">
      <Space.Compact>
        <Select
          status="primary"
          onChange={(v) => {
            setCol(v);
          }}
          placeholder="Choose column"
          options={columns.map((prop) => ({
            label: prop.title,
            value: prop.key,
          }))}
        />
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
        />
        <Button type="primary">
          <SearchOutlined />
        </Button>
      </Space.Compact>
      <Space.Compact></Space.Compact>
    </Space>
  ),
}) {
  const [col, setCol] = React.useState("");
  const [search, setSearch] = React.useState("");

  return (
    <div>
      <Row style={{ marginBottom: 10 }}>
        <Col md={12}>
          <SearchComponent setCol={setCol} setSearch={setSearch} />
        </Col>
        <Col md={12}>
          <Button
            onClick={onButtonClick}
            shape="rounded"
            style={{ float: "right" }}
            type="primary"
          >
            {buttonText}
          </Button>
          <Space align="end"></Space>
        </Col>
      </Row>

      <Table
        showHeader={showHeader}
        rowHoverable={hoverable}
        style={{ minHeight: 700 }}
        sticky
        showSorterTooltip
        size="large"
        dataSource={
          col !== "" && search !== ""
            ? rows
                .map((prop) => ({
                  ...prop,
                  action: (
                    <div>
                      <DotChartOutlined />
                    </div>
                  ),
                }))
                .filter((v) =>
                  v[col].toLowerCase().includes(search.toLowerCase())
                )
            : rows.map((prop) => ({
                ...prop,
                action: (
                  <div>
                    <Tooltip defaultOpen={true} open>
                      <DotChartOutlined />
                    </Tooltip>
                  </div>
                ),
              }))
        }
        columns={[
          ...columns.map((prop) => ({ ...prop, dataIndex: prop.key })),
          {
            dataIndex: "action",
            title: "Action",
            width: 90,
            align: "center",
          },
        ]}
      />
    </div>
  );
}

const TableMenu = ({ data }) => {
  return (
    <div>
      <Tooltip defaultOpen={true} open>
        <DotChartOutlined />
      </Tooltip>
    </div>
  );
};
