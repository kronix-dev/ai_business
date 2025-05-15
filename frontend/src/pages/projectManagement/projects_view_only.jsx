import * as React from "react";
import ListPage from "../../components/listPage";
import KModal from "../../components/modal";
import KForm from "../../components/form";
import ProjectsService from "../../services/projects";
import { DataDisplayModal, addComponent } from "../../components/dataDisplay";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function ProjectListReadOnly() {
  const [open, setOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [activeIndex, setActiveItem] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
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
      ],
    },
    {
      type: "text",
      placeholder: "Contract period",
      name: "contract_period",
    },
    {
      type: "row",
      children: [
        {
          type: "text",
          placeholder: "Contractor Price",
          name: "contract_price",
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
      ],
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
            sm: 24,
            md: 24,
          },
        },
      ],
    },
  ];
  const getProjectData = (index) => {
    let p = [];
    p.push({
      ...addComponent(
        "textLabel",
        "Contractor name",
        projects[index].contractor_name
      ),
    });
    p.push({
      ...addComponent(
        "textLabel",
        "Contractor number",
        projects[index].contractor_no
      ),
    });
    p.push({
      ...addComponent(
        "textLabel",
        "Contract Price",
        projects[index].contract_price
      ),
    });
    p.push({
      ...addComponent(
        "textLabel",
        "Contract Period",
        projects[index].contract_period
      ),
    });
    p.push({
      ...addComponent("textLabel", "Client", projects[index].client),
    });
    p.push({
      ...addComponent("textLabel", "Bank name", projects[index].bank_name),
    });
    p.push({
      ...addComponent(
        "textLabel",
        "Advance payment",
        projects[index].advance_payment
      ),
    });
    p.push({
      ...addComponent(
        "textLabel",
        "Advance payment",
        projects[index].advance_payment
      ),
    });
    p.push({
      ...addComponent(
        "textLabel",
        "Validity period",
        projects[index].validity_period
      ),
    });
    p.push({
      ...addComponent("textLabel", "Start date", projects[index].start_date),
    });
    p.push({
      ...addComponent("textLabel", "Start date", projects[index].start_date),
    });
    return p;
  };
  const addProject = (data) => {
    ProjectsService.createProject(data).then((r) => {
      getProjects();
    });
  };
  const editProject = () => {
    let p = data;
    data["pid"] = projects[activeIndex].id;
    ProjectsService.createProject(p).then((r) => {
      getProjects();
    });
  };
  const getProjects = () => {
    ProjectsService.getProjects().then((r) => {
      console.log(r.data);
      setProjects(r.data);
      setOpen(false);
    });
  };
  React.useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <ListPage
        rows={projects}
        childButtons={
          <div>
            <Button
              onClick={() => {
                ProjectsService.pushNotification();
              }}
            >
              Send push notification
            </Button>
          </div>
        }
        tableMenu={[
          {
            icon: <EyeOutlined />,
            label: "View",
            onClick: (data, key) => {
              setViewOpen(true);
              setActiveItem(key);
            },
          },
        ]}
        columns={[
          { key: "id", title: "Id", width: 50 },
          { key: "name", title: "Title" },
          { key: "contractor_name", title: "Contractor name", width: 270 },
          { key: "contract_price", title: "Contractor price", width: 270 },
          { key: "contract_period", title: "Contract period", width: 270 },
          { key: "validity_period", title: "Validity period", width: 270 },
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
          if (activeIndex === null) {
            addProject(data);
          } else {
            editProject(data);
          }
        }}
      >
        <KForm
          showLabels={true}
          onFormChange={(form) => {
            setData(form);
          }}
          defaultValues={activeIndex !== null ? projects[activeIndex] : {}}
          form={createProject}
          showSubmitButton={false}
          submitText="Save"
        />
      </KModal>
      <DataDisplayModal
        setOpen={(viewop) => {
          setActiveItem(null);
          setViewOpen(viewop);
        }}
        data={activeIndex !== null ? getProjectData(activeIndex) : []}
        open={viewOpen}
        title={activeIndex !== null ? projects[activeIndex].name : ""}
        onOk={() => {
          // addProject(data);
        }}
      />
    </div>
  );
}
