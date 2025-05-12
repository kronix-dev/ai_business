import * as React from "react";
import ListPage from "../../components/listPage";
import KModal from "../../components/modal";
import KForm from "../../components/form";
import { MessageOutlined } from "@ant-design/icons";
import { MentorshipService } from "../../services/mentorship";

export default function MentorList() {
  const [data, setData] = React.useState([]);
  const getMentors = () => {
    MentorshipService.getMentors();
  };
  React.useEffect(() => {
    getMentors();
  }, []);

  return (
    <div>
      <ListPage
        title="My mentors"
        showCreate={false}
        columns={[]}
        rows={data}
        tableMenu={[
          {
            label: "Consult",
            icon: <MessageOutlined />,
            key: 0,
            onClick: () => {},
          },
        ]}
      />
      ;
    </div>
  );
}
