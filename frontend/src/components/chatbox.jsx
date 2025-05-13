import * as React from "react";
import { Card, Typography, Tag, Space, Input, Button,Divider, Avatar } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
export default function Chatbox({ chatHeight = 500, userName, userId }) {
  const [messages, setMessages] = React.useState([
    { mine: true, message: "Hi" },
    { mine: false, message: "Hello" },
  ]);
  const [, forceUpdate] = React.useState();
  const [typing, setTyping] = React.useState("");
  const sendMessage = () => {
    let p = messages;
    p.push({ mine: true, message: typing });
    setMessages(p);
    forceUpdate({});
  };
  return (
    <Card>
      <div>
        <Meta
          avatar={<Avatar src="/images/ic2.png" shape="circle" />}
          title={userName}
          description="Mentor"
        />
        <Divider />
      </div>
      <div
        style={{
          overflow: "auto",
          padding: 24,
          margin: 0,
          height: chatHeight,
          minHeight: 280,
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
          }}
        >
          {messages.map((prop, key) =>
            prop.mine ? (
              <MyBubble text={prop.message} />
            ) : (
              <OtherBubble text={prop.message} />
            )
          )}
          <div>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                onChange={(e) => {
                  setTyping(e.target.value);
                }}
              />
              <Button type="primary" onClick={sendMessage}>
                <SendOutlined />
              </Button>
            </Space.Compact>
          </div>
        </div>
      </div>
    </Card>
  );
}

const MyBubble = ({ text }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "row",
    }}
  >
    <div
      style={{
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 20,
      }}
    >
      <Tag style={{ borderTopRightRadius: 0 }} title={text} color="success">
        <Typography style={{ padding: 10 }}>{text}</Typography>
      </Tag>
    </div>
  </div>
);

const OtherBubble = ({ text }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
    }}
  >
    <div
      style={{
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 20,
      }}
    >
      <Tag style={{ borderTopLeftRadius: 0 }} title={text} color="cyan">
        <Typography style={{ padding: 10 }}>{text}</Typography>
      </Tag>
    </div>
  </div>
);
