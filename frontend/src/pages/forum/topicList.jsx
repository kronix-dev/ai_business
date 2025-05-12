import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Typography, Space, Input, Button } from "antd";
import Meta from "antd/es/card/Meta";
import * as React from "react";
import KTable from "../../components/table";
import ForumService from "../../services/forum";
import KForm from "../../components/form";
import KModal from "../../components/modal";
import { useNavigate } from "react-router";
export default function TopicList() {
  const [topics, setTopics] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const getTopics = () => {
    ForumService.getTopics().then((r) => {
      setTopics(r.data);
    });
  };
  const getCats = () => {
    ForumService.getCategories().then((r) => {
      setCats(r.data);
    });
  };
  const createTopic = () => {
    ForumService.createTopic(data).then((r) => {
      getTopics();
      setOpen(false)
    });
  };
  const addTopicForm = [
    { type: "text", placeholder: "Title", name: "title" },
    { type: "text", placeholder: "Description", name: "description" },
    {
      type: "select",
      placeholder: "Category",
      name: "category",
      options: cats.map((prop, key) => ({
        label: prop.name,
        value: prop.id,
      })),
      grid: {
        sm: 12,
        md: 12,
      },
    },
  ];
  React.useEffect(() => {
    getCats()
    getTopics();
  }, []);
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Row>
        <Col xs={24} md={4}></Col>
        <Col xs={6} md={16}>
          <KModal title="Add a new topic" onOk={createTopic} setOpen={setOpen} open={open}>
            <KForm form={addTopicForm} onFormChange={(s)=>{setData(s); }} />
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
  let nav = useNavigate();
  return (
    <div>
      <Card
      hoverable
        onClick={() => {
          nav("topic/" + id);
        }}
      >
        <Meta
          avatar={<Avatar src="/vite.svg" shape="circle" />}
          title={<Typography onClick={() => {}}>{title}</Typography>}
          description={paragraph}
        />
      </Card>
    </div>
  );
}
