import * as React from "react";
import ListPage from "../../components/listPage";
import KModal from "../../components/modal";
import KForm from "../../components/form";
import { CiCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { MentorshipService } from "../../services/mentorship";

export default function MenteeList({setView, setItem}) {
  const [data, setData] = React.useState([]);
  const getMentees = () => {
    MentorshipService.getMentees().then(r=>{
        setData(r.data)
    });
  };
  React.useEffect(() => {
    getMentees();
  }, []);

  return (
    <div>
      <ListPage
        title="My mentees"
        columns={[
            { key: "id", title: "Id", width: 50 },
            { key: "fname", title: "Name"},
            {key: "", title:""},
        ]}
        showCreate={false}
        rows={data}
        tableMenu={[
          {
            label: "Consult",
            icon: <MessageOutlined />,
            key: 0,
            onClick: (o) => {
                setView("message")
                setItem(o)
            },
          },
          {
            label: "End mentorship",
            icon: <CiCircleOutlined />,
            key: 0,
            onClick: () => {},
          },
        ]}
      />
      ;
    </div>
  );
}
