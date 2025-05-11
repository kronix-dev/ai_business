import * as React from "react";
import { Col, Input, Modal, Row, Select, Table, Typography } from "antd";
import KTable from "../../components/table";
import ListPage from "../../components/listPage";
import KForm from "../../components/form";
import Budgeting from "../../services/budgeting";
import KModal from "../../components/modal";
import modalNameAPI from "./api";
export default function listmodelName({ columns = [], rows = [] }) {
  const [cats, setCats] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [, forceUpdate] = React.useState();
  
  const [formData, setFormData] = React.useState({});
  React.useEffect(() => {
    getCats();
    modalNameAPI.listmodelName().then(r=>{
      if(typeof r.data ==="object"){
        setData(r.data)
      }
    })
  }, []);
  return (
    <div>
      <ListPage
        columns={[
          { key: "id", title: "Id", width: 50 },
          { key: "category", title: "Category", width: 170 },
          { key: "description", title: "Description" },
          { key: "amount", title: "Amount" },
        ]}
        titlee={"modelTitle"}
        onAdd={() => {
          setOpen(true);
          forceUpdate({});
        }}
        rows={data}
      />
      <KModal
        setOpen={setOpen}
        open={open}
        onOk={() => {
          modalNameAPI.createmodelName(formData);
          setOpen(false);
          let p = data
          let f = formData
          f["category"] = cats.filter(v=>(v.id==f["category"])).name
          p.push(formData)
          setData(p)
        }}
      >
        <Typography.Title level={4}>Add a modelTitle</Typography.Title>
        <KForm
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
