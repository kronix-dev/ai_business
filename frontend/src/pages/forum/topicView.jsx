import { Divider, Typography } from "antd";
import * as React from "react";
import KForm from "../../components/form";

export default function TopicPage() {
  const [comments, setComments] = React.useState([""]);
  return (
    <div>
      <Typography.Title>How to</Typography.Title>
      <Typography>You just  </Typography>
      <Divider />
      {comments.map((prop) => (
        <CommentCard user={"Kronix"} message={"Hello"}/>
      ))}
      <KForm showSubmitButton submitText="Comment" form={[{ name: "comment", placeholder:"Type your message", type:"textarea" }]} />
    </div>
  );
}

const CommentCard = ({ user, message }) => (
  <div>
    <Typography>
      <strong>{user}</strong>
    </Typography>
    <Typography>{message}</Typography>
    <Divider/>
  </div>
);
