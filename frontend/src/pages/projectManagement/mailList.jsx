import * as React from "react";
import ListPage from "../../components/listPage";
import KModal from "../../components/modal";
import KForm from "../../components/form";
import ProjectsService from "../../services/projects";

export default function MailList() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [projects, setProjects] = React.useState([]);
  const mailForm = [
    {
      type: "text",
      placeholder: "Name",
      name: "name",
      grid: {
        sm: 24,
        md: 24,
      },
    },
    {
      type: "row",
      children: [
        {
          type: "select",
          placeholder: "Type",
          name: "type",
          grid: {
            sm: 24,
            md: 12,
          },
          options: [
            { value: "phone", label: "Phone number" },
            { value: "email", label: "Email" },
          ],
        },
        {
          type: "text",
          placeholder: "Address",
          name: "address",
          grid: {
            sm: 24,
            md: 12,
          },
        },
      ],
    },
  ];
  const addProject = (data) => {
    ProjectsService.createMailList(data).then((r)=>{
      getProjects()
    });

  };
  const getProjects = () => {
    ProjectsService.getMailList().then((r) => {
      setProjects(r.data);
      setOpen(false)
    });
  };
  React.useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <ListPage
        columns={[
          { key: "id", title: "Id", width: 50 },
          { key: "name", title: "Name", },
          {
            key: "type",
            title: "Type",
            align: "right",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.age - b.age,
          },
          {
            key: "address",
            title: "Phone number / Email address",
            align: "right",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.age - b.age,
          },
        ]}
        rows={projects}
        onAdd={() => {
          setOpen(true);
        }}
        titlee={"My mailing list"}
      />
      <KModal
        setOpen={setOpen}
        open={open}
        title="Add User"
        onOk={() => {
          addProject(data);
        }}
      >
        <KForm
          showLabels={true}
          onFormChange={(form) => {
            setData(form);
          }}
          form={mailForm}
          showSubmitButton={false}
          submitText="Save"
        />
      </KModal>
    </div>
  );
}
