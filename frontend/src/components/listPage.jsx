import { FloatButton, Typography,  } from "antd";
import * as React from "react";
import Icon, { FileAddOutlined, FileAddTwoTone } from "@ant-design/icons";
import KTable from "./table";
export default function ListPage({ rows, columns, title, onAdd, titlee="", tableMenu,childButtons=<></> }) {
  return (
    <div>
      <Typography.Title level={4}>{titlee}</Typography.Title>
      <KTable tableMenu={tableMenu} columns={columns} rows={rows} childButtons={childButtons} onButtonClick={onAdd}/>
      
    </div>
  );
}
