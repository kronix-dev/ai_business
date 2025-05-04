import * as React from "react";
import { Col, Input, Modal, Row, Select, Table, Typography } from "antd";
import KTable from "../../components/table";
import ListPage from "../../components/listPage";
import KForm from "../../components/form";
import Budgeting from "../../services/budgeting";
import KModal from "../../components/modal";
export default function BudgetList({ columns = [], rows = [] }) {
  const [cats, setCats] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [, forceUpdate] = React.useState();
  const getCats = () => {
    Budgeting.getBudgetCategories().then((r) => {
      setCats(r.data);
    });
  };
  const [formData, setFormData] = React.useState({});
  const addRevenueInput = [
    {
      type: "text",
      placeholder: "Title",
      name: "name",
      
    },
    {
      type: "row",
      children: [
        {
          type: "date",
          placeholder: "Start date",
          name: "start_date",
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
          type: "date",
          placeholder: "End date",
          name: "end_date",
          options: cats.map((prop, key) => ({
            label: prop.name,
            value: prop.id,
          })),
          grid: {
            sm: 12,
            md: 12,
          },
        },
      ],
    },
    {
      type: "pair",
      placeholder: "description",
      name: "budget_items",
      itemText:"Budget item ",
      
      child: {
        type: "row",
        children: [
          {
            type: "number",
            placeholder: "Amount",
            name: "amount",
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
            type: "textarea",
            placeholder: "Description",
            name: "description",
            options: cats.map((prop, key) => ({
              label: prop.name,
              value: prop.id,
            })),
            grid: {
              sm: 24,
              md: 24,
            },
          },
        ],
      },
    },
  ];
  React.useEffect(() => {
    getCats();
    Budgeting.getBudgets().then((r) => {
      if (typeof r.data === "object") {
        setData(r.data);
      }
    });
  }, []);
  return (
    <div>
      <ListPage
        columns={[
          { key: "id", title: "Id", width: 50 },
          { key: "name", title: "Title", width: 270 },
          { key: "start_date", title: "Start date", align: "right",defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age, },
          { key: "end_date", title: "End date", align: "right",defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age, },
        ]}
        titlee={"My Budgets"}
        onAdd={() => {
          setOpen(true);
          forceUpdate({});
        }}
        rows={data}
      />
       <KModal
        setOpen={setOpen}
        open={open}
        title="Create budget"
        onOk={() => {
          Budgeting.createBudget(formData);
          setOpen(false);
          let p = data;
          let f = formData;
          f["category"] = cats.filter((v) => v.id == f["category"]).name;
          p.push(formData);
          setData(p);
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
