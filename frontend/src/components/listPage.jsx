import { FloatButton, Typography,  } from "antd";
import * as React from "react";
import Icon, { FileAddOutlined, FileAddTwoTone } from "@ant-design/icons";
import KTable from "./table";
export default function ListPage({ rows, columns, title, onAdd, titlee="" }) {
  return (
    <div>
      <Typography.Title level={4}>{titlee}</Typography.Title>
      <KTable columns={columns} rows={rows} onButtonClick={onAdd}/>
      
    </div>
  );
}
