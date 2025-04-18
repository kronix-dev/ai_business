import * as React from "react";
import ListPage from "../../components/listPage";
import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Row,Col, Typography } from "antd";
export default function MenteeList() {
  return (
    <div>
      <ListPage
        columns={[
          { key: "name", title: "Title", width: 270 },
          {
            key: "start_date",
            title: "Start date",
            align: "right",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.age - b.age,
          },
          
        ]}
        titlee={"My Mentees"}
        showAdd={false}
        onAdd={() => {
          forceUpdate({});
        }}
        rows={[
          {
            id: 1,
            name: <UserCard />,
            start_date: 1,
            end_date: 1,
          },
          {
            id: 1,
            name: <UserCard />,
            start_date: 1,
            end_date: 1,
          },
        ]}
      />
    </div>
  );
}
const UserCard = () => {
  return (
    <Row>
        <Col xs={6}>
      <Avatar src="/images/ic1.png" style={{backgroundColor:"#adadad", height:50, width:50}} size={"large"} />
        </Col>
        <Col xs={18}>
            <Typography><strong>Hassan Said</strong></Typography>
        </Col>
    </Row>
  );
};
