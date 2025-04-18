import * as React from "react";
import { Col, Input, Modal, Row, Select, Table, Typography } from "antd";
import KTable from "../../components/table";
import ListPage from "../../components/listPage";
import KForm from "../../components/form";
import Budgeting from "../../services/budgeting";
import KModal from "../../components/modal";
export default function RevenueList({ columns = [], rows = [] }) {
  const [cats, setCats] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [, forceUpdate] = React.useState();
  const getCats = () => {
    Budgeting.getRevenueCategories().then((r) => {
      setCats(r.data);
    });
  };
  const [formData, setFormData] = React.useState({});
  const addRevenueInput = [
    {
      type: "row",
      children: [
        {
          type: "select",
          placeholder: "Category",
          name: "category",
          options: cats.map((prop, key) => ({
            label: prop.name,
            value: prop.id,
          })),
          grid: {
            sm: 12,
            md: 12,
          },
        },
        {
          type: "text",
          placeholder: "Amount",
          name: "amount",
          grid: {
            sm: 12,
            md: 12,
          },
        },
      ],
    },

    {
      type: "textarea",
      placeholder: "description",
      name: "description",
      grid: {
        sm: 24,
        md: 24,
      },
    },
  ];
  React.useEffect(() => {
    getCats();
    Budgeting.getRevenues().then(r=>{
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
        titlee={"Revenues"}
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
          Budgeting.createRevenue(formData);
          setOpen(false);
          let p = data
          let f = formData
          f["category"] = cats.filter(v=>(v.id==f["category"])).name
          p.push(formData)
          setData(p)
        }}
      >
        <Typography.Title level={4}>Add a revenue record</Typography.Title>
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
