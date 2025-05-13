import { FloatButton, Typography } from "antd";
import * as React from "react";
import Icon, { FileAddOutlined, FileAddTwoTone } from "@ant-design/icons";
import KTable from "./table";
export default function ListPage({
  rows,
  columns,
  title = "",
  onAdd,
  tableMenu,
  childButtons = <></>,
  showCreate = true,
  buttonText = "Create new"
}) {
  return (
    <div>
      <Typography.Title level={4}>{title}</Typography.Title>
      <KTable
        
        tableMenu={tableMenu}
        showCreate={showCreate}
        columns={columns}
        buttonText={buttonText}
        rows={rows}
        childButtons={childButtons}
        onButtonClick={onAdd}
      />
    </div>
  );
}
