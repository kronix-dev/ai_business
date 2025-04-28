import * as React from "react";
import ListPage from "../../components/listPage";
import KModal from "../../components/modal";
import KForm from "../../components/form";
import ProjectsService from "../../services/projects";

export default function ProjectList() {
  const [open, setOpen] = React.useState(false);
  const [data,setData]= React.useState({})
  const [projects, setProjects] = React.useState([])
  const createProject = [
    {
      type: "text",
      placeholder: "Project name",
      name: "name",
      grid: {
        sm: 24,
        md: 24,
      },
    },
    {
        type: "text",
        placeholder: "Client",
        name: "client",
        grid: {
          sm: 24,
          md: 24,
        },
      },
    
    {
      type: "row",
      children: [
        {
          type: "text",
          placeholder: "Contractor Name",
          name: "contractor_name",
          grid: {
            sm: 24,
            md: 12,
          },
        },
        {
          type: "text",
          placeholder: "Contractor Number",
          name: "contractor_no",
          grid: {
            sm: 24,
            md: 12,
          },
        },
      ]
    },
    {
        type: "text",
        placeholder: "Contract period",
        name: "contract_price",
      },
    {
        type: "row",
        children: [
            {
              type: "text",
              placeholder: "Contractor Price",
              name: "contractor_price",
              grid: {
                sm: 24,
                md: 12,
              },
            },
            {
              type: "text",
              placeholder: "Advance Payment",
              name: "advance_payment",
              grid: {
                sm: 24,
                md: 12,
              },
            },
        ]
      },


    {
      type: "row",
      children: [
        {
          type: "text",
          placeholder: "Bank Name",
          name: "bank_name",
          grid: {
            sm: 24,
            md: 12,
          },
        },
        {
          type: "number",
          placeholder: "Validity period (In months)",
          name: "validity_period",
          grid: {
            sm: 24,
            md: 12,
          },
        },
      ],
    },
    {
      type: "row",
      children: [
        {
          type: "date",
          placeholder: "Start date",
          name: "start_date",
          grid: {
            sm: 12,
            md: 12,
          },
        },
        {
          type: "date",
          placeholder: "End date",
          name: "end_date",
          readOnly: true,
          grid: {
            sm: 12,
            md: 12,
          },
        },
      ],
    },
  ];
  const addProject = (data)=>{
    ProjectsService.createProject(data)
  }
  const getProjects = ()=>{
    ProjectsService.getProjects().then(r=>{
        setProjects(r)
    })
  }
  React.useEffect(()=>{
    getProjects()
  },[])
  return (
    <div>
      <ListPage
        columns={[
          { key: "id", title: "Id", width: 50 },
          { key: "name", title: "Title", width: 270 },
          {
            key: "start_date",
            title: "Start date",
            align: "right",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.age - b.age,
          },
          {
            key: "end_date",
            title: "End date",
            align: "right",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.age - b.age,
          },
        ]}
        onAdd={() => {
          setOpen(true);
        }}
        titlee={"My Projects"}
      />
      <KModal
        setOpen={setOpen}
        open={open}
        title="Create Project"
        onOk={() => {
            addProject(data)
        }}
      >
        <KForm
          showLabels={true}
          onFormChange={(form) => {
            setData(form);
          }}
          form={createProject}
          showSubmitButton={false}
          submitText="Save"
        />
      </KModal>
    </div>
  );
}
