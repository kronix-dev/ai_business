import * as React from "react";
import ListPage from "../../components/listPage";
import ElearningService from "../../services/elearning";
import KForm from "../../components/form";
import KModal from "../../components/modal";

export default function CreatorPanel() {
  const [mat, setMat] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [data, setData] = React.useState([{}]);
  const [formData, setFormData] = React.useState({})
  const [open, setOpen] = React.useState(false);
  const [, forceUpdate] = React.useState();
  const getMats = () => {
    ElearningService.getMaterials().then((r) => {
      setMat(r.data);
    });
  };
  const addRevenueInput = [
    {
      type: "text",
      placeholder: "Title",
      name: "name",
    },
    {
      type: "textarea",
      placeholder: "Description",
      name: "description",
    },
    {
      type: "text",
      placeholder: "Link",
      name: "link",
    },
    {
      type: "file",
      placeholder: "File upload",
      name: "file",
    },
  ];
  React.useEffect(() => {
    getMats();
  }, []);

  return (
    <div>
      <ListPage
        rows={mat}
        columns={[
          { key: "title", title: "Title" },
          { key: "link", title: "Link" },
          { key: "description", title: "Description" },
        ]}
        onAdd={() => {
          setOpen(true);
        }}
      />
      <KModal
        setOpen={setOpen}
        open={open}
        containerWidth={window.innerWidth / 3}
        title="Create budget"
        onOk={() => {
          ElearningService.createMaterial(formData);
          setOpen(false);
        }}
      >
        <KForm
          showLabels={true}
          onChange={(data) => {
            setData(data);
          }}
          onFormChange={(form) => {
            setFormData(form);
          }}
          form={addRevenueInput}
          showSubmitButton={false}
          submitText="Save"
        />
      </KModal>
    </div>
  );
}
