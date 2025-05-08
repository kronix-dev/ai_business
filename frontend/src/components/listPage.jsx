import { FloatButton, Typography,  } from "antd";
import * as React from "react";
import Icon, { FileAddOutlined, FileAddTwoTone } from "@ant-design/icons";
import KTable from "./table";
export default function ListPage({ rows, columns, title, onAdd, titlee="", tableMenu }) {
  return (
    <div>
      <Typography.Title level={4}>{titlee}</Typography.Title>
      <KTable tableMenu={tableMenu} columns={columns} rows={rows} onButtonClick={onAdd}/>
      
    </div>
  );
}
