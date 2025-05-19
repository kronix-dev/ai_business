import { Divider, Typography } from "antd";
import * as React from "react";
import KForm from "../../components/form";
import ForumService from "../../services/forum";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function TopicPage({topic, setView, title, description}) {
  const [comments, setComments] = React.useState([""]);
  const getComments = ()=>{
    ForumService.getComments(topic).then(r=>{
      setComments(r.data)
    })
  }
  const [comment, setComment] = React.useState([])
  const postComment = (e)=>{
    ForumService.postComment(e).then(r=>{
      getComments()
    })
  }
  React.useEffect(()=>{
    getComments()
  },[])
  return (
    <div>
      <ArrowLeftOutlined onClick={()=>{setView('list')}}/>
      <Typography.Title>{title}</Typography.Title>
      <Typography>{description}</Typography>
      <Divider />
      {comments.map((prop) => (
        <CommentCard user={prop.commenter_name} message={prop.message}/>
      ))}
      <KForm onSubmit={postComment} showSubmitButton submitText="Comment" form={[{ name: "comment", placeholder:"Type your message", type:"textarea" }]} />
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
