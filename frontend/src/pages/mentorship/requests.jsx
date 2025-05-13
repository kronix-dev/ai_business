import * as React from "react";
import KTable from "../../components/table";
import { Row, Col, Space } from "antd";
import { UserMentorshipRequest } from "./mentorComponents";

export default function MentorRequest() {
  const [request, setResults] = React.useState([]);
  const getRequest = () => {};
  return (
    <Row>
      <Col xs={24} md={4}></Col>
      <Col xs={24} md={16}>
        <KTable
          showHeader={false}
          hoverable={false}
          showCreate={false}
          onButtonClick={() => {
            setOpen(true);
          }}
          SearchComponent={() => <Space direction="horizontal"></Space>}
          columns={[{ key: "id", title: "" }]}
          rows={request.map((prop) => ({
            id: (
              <UserMentorshipRequest
                user={prop.business_name}
                request={prop.id}
              />
            ),
          }))}
        />
      </Col>
    </Row>
  );
}
