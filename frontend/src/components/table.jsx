import * as React from "react";
import { Button, Col, Input, Row, Select, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default function KTable({ columns = [], rows = [], buttonText ="Create new", onButtonClick=()=>{} }) {
  const [col,setCol] = React.useState('')
  const [search, setSearch] = React.useState('')

  return (
    <div>
      <Row style={{marginBottom:10}}>
        <Col md={12}>
          <Space direction="horizontal">
            <Space.Compact>
              <Select
               status="primary"
               onChange={v=>{setCol(v)}}
                placeholder="Choose column"
                options={columns.map((prop) => ({
                  label: prop.title,
                  value: prop.key,
                }))}
              />
              <Input onChange={e=>{setSearch(e.target.value)}}placeholder="Search" />
              <Button type="primary"><SearchOutlined/></Button>
            </Space.Compact>
            <Space.Compact></Space.Compact>
          </Space>
        </Col>
        <Col md={12}>
              <Button onClick={onButtonClick} shape="rounded" style={{float:"right"}} type="primary">
                {buttonText}
              </Button>
            <Space align="end">
            </Space>
        </Col>
      </Row>

      <Table
        style={{minHeight:700}}
        sticky
        showSorterTooltip
        size="large"
        dataSource={ col!==''&& search!==''?rows.filter(v=>(v[col].toLowerCase().includes(search.toLowerCase()))): rows}
        columns={columns.map((prop) => ({ ...prop, dataIndex: prop.key }))}
      />
    </div>
  );
}
