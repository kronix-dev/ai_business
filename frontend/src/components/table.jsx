import * as React from "react";
import {
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { DotChartOutlined, SearchOutlined } from "@ant-design/icons";
import * as AntIcon from "@ant-design/icons";
export default function KTable({
  columns = [],
  hoverable = true,
  tableMenu = [],
  childButtons = <></>,
  showHeader = true,
  rows = [],
  minHeight = 700,
  buttonText = "Create new",
  showCreate = true,
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
    <div style={{ width: "100%", maxWidth: "100%" }}>
      <Row style={{ marginBottom: 10 }}>
        <Col md={12}>
          <SearchComponent setCol={setCol} setSearch={setSearch} />
        </Col>
        <Col md={12} style={{justifyContent:"flex-end", display:"flex"}}>
          <Space align="end">
            {showCreate && (
              <Button
                onClick={onButtonClick}
                shape="rounded"
                style={{ float: "right" }}
                type="primary"
              >
                {buttonText}
              </Button>
            )}
            {childButtons}
          </Space>
        </Col>
      </Row>

      <Table
        showHeader={showHeader}
        rowHoverable={hoverable}
        style={{ minHeight: minHeight }}
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
            : rows.map((prop, key) => ({
                ...prop,
                action: (
                  <div>
                    <TableMenu menus={tableMenu} data={prop} itemKey={key} />
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

const TableMenu = ({ data, menus, itemKey }) => {
  return (
    <div>
      <Dropdown
        placement="top"
        dropdownRender={() => (
          <Menu
            items={menus.map((prop) => ({
              icon: prop.icon,
              label: prop.label,
              onClick: () => {
                prop.onClick(data, itemKey);
              },
            }))}
          />
        )}
      >
        <AntIcon.EllipsisOutlined />
      </Dropdown>
    </div>
  );
};
