import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Typography, Space, Input, Button } from "antd";
import Meta from "antd/es/card/Meta";
import * as React from "react";
import KTable from "../../components/table";
import ForumService from "../../services/forum";
import KForm from "../../components/form";
import KModal from "../../components/modal";

export default function TopicList() {
  const [topics, setTopics] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const getTopics = () => {
    ForumService.getTopics().then((r) => {
      setTopics(r.data);
    });
  };
  const createTopic = (data) => {
    ForumService.createTopic(data).then((r) => {
      getTopics();
    });
  };
  const addTopicForm = [
    { type: "text", placeholder: "Title", name: "title" },
    { type: "text", placeholder: "Description", name: "description" },
  ];
  React.useEffect(() => {
    getTopics();
  }, []);
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Row>
        <Col xs={24} md={4}></Col>
        <Col xs={6} md={16}>
          <KModal title="Add a new topic" setOpen={setOpen} open={open}>
            <KForm form={addTopicForm} />
          </KModal>

          <KTable
            showHeader={false}
            hoverable={false}
            onButtonClick={() => {
              setOpen(true);
            }}
            SearchComponent={() => (
              <Space direction="horizontal">
                <Space.Compact>
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
            )}
            columns={[{ key: "id", title: "" }]}
            rows={topics.map((prop) => ({
              id: <TopicCard title={prop.title} paragraph={prop.description} />,
            }))}
          />
        </Col>
      </Row>
    </div>
  );
}

export function TopicCard({ title, paragraph, id }) {
  return (
    <div>
      <Card>
        <Meta
          avatar={<Avatar src="/vite.svg" shape="circle" />}
          title={<Typography onClick={() => {}}>{title}</Typography>}
          description={paragraph}
        />
      </Card>
    </div>
  );
}
