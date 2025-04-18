import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import * as React from "react";

export default function KForm({
  form,
  onSubmit,
  submitText = "submit",
  onFormChange,
  showLabels = false,
  showSubmitButton = false,
}) {
  const [fieldData, setFieldData] = React.useState({});
  const onChange = (e, v) => {
    let f = fieldData;
    f[e] = v;
    onFormChange(f);
    setFieldData(f);
    console.log(f)
  };

  return (
    <Form layout="vertical">
      {form.map((prop) =>
        !["row","pair"].includes(prop.type) ? (
          <Form.Item label={showLabels ? prop.placeholder : null}>
            <GetInput
              onChange={onChange}
              showLabels={showLabels}
              type={prop.type}
              data={prop}
            />
          </Form.Item>
        ) : (
          <GetInput
            showLabels={showLabels}
            onChange={onChange}
            type={prop.type}
            data={prop}
          />
        )
      )}
      {showSubmitButton ? (
        <Button
          onClick={() => {
            onSubmit(fieldData);
          }}
          type="primary"
        >
          {submitText}
        </Button>
      ) : null}
    </Form>
  );
}

function GetInput({ type, data, showLabels, onChange }) {
  switch (type) {
    case "checkbox":
      return <KCheckbox data={data} onChange={onChange}/>
    case "pair":
      return <PairInput onChange={onChange} showLabels={showLabels} data={data} />;
    case "date":
      return <KDatePicker onChange={onChange} data={data} />;
    case "text":
    case "number":
    case "email":
    case "password":
      return <TextInput onChange={onChange} data={data} />;
    case "textarea":
      return <KTextArea onChange={onChange} data={data} />;
    case "autocomplete":
      return <KAutoComplete onChange={onChange} data={data} />;
    case "select":
      return <SelectInput onChange={onChange} data={data} />;
    case "multiple-select":
      return <MultipleSelectInput onChange={onChange} data={data} />;
    case "row":
      return <KRow onChange={onChange} data={data} showLabels={showLabels} />;
    default:
      return <></>;
  }
}

function TextInput({ data, onChange = (e, v) => {} }) {
  return (
    <Input
      placeholder={data.placeholder}
      onChange={(v) => {
        onChange(data.name, v.target.value);
      }}
      type={data.type}
      name={data.name}
    />
  );
}

function KCheckbox({data,onChange}){
  return(
    <Space>
      <Checkbox title={data.name} onChange={(c)=>{onChange(data.name, c.target.checked)}}/>
      <Typography>{data.placeholder}</Typography>
    </Space>
  )
}
function KDatePicker({ data, onChange }) {
  return (
    <DatePicker
      style={{ width: "100%" }}
      placeholder={data.placeholder}
      onChange={(v) => {
        onChange(data.name, v.format('YYYY-MM-DD'));
      }}
      name={data.name}
    />
  );
}

function MultipleSelectInput({ data, onChange = (e, v) => {} }) {
  return (
    <Select
      placeholder={data.placeholder}
      tokenSeparators={[","]}
      mode="tags"
      onChange={(v) => {
        onChange(data.name, v);
        setSelected(v);
      }}
      options={data.options}
    />
  );
}
function SelectInput({ data, onChange = (e, v) => {} }) {
  const [selected, setSelected] = React.useState("");
  return (
    <Select
      placeholder={data.placeholder}
      tokenSeparators={[","]}
      onChange={(v) => {
        onChange(data.name, v);
      }}
      options={data.options}
    />
  );
}

function KTextArea({ data, onChange = (e, v) => {} }) {
  return (
    <TextArea
      rows={4}
      placeholder={data.placeholder}
      onChange={(v) => {
        onChange(data.name, v.target.value);
      }}
    />
  );
}
function KAutoComplete({ data, onChange = (e, v) => {} }) {
  console.log(data);
  return (
    <AutoComplete
      options={data.options.map((p,key)=>({label: p.label, value:p.label}))}
      key={"asd"}
      tokenSeparators={[","]}
      maxCount={90}
      onChange={(v) => {
        onChange(data.name, v);
      }}
      placeholder={data.placeholder}
    />
  );
}
function KRow({ data, showLabels, onChange }) {
  return (
    <Row>
      {data.children.map((item, key) => (
        <Col style={{ padding: 3 }} md={item.grid.md} xs={item.grid.xs}>
          <Form.Item label={showLabels ? item.placeholder : null}>
            <GetInput onChange={onChange} type={item.type} data={item} />
          </Form.Item>
        </Col>
      ))}
    </Row>
  );
}

function PairInput({ data, showLabels, onChange }) {
  const [count, setCount] = React.useState([{}]);
  const [, forceUpdate] = React.useState();
  const increment = () => {
    let c = count;
    c.push({});
    setCount(c);
    forceUpdate({});
  };
  const decrement = (key) => {
    let c = count
    c.splice(key)
    setCount(c);
  };
  const onDataChange = (name,value,key)=>{
    let c = count 
    c[key][name] = value
    setCount(c)
    onChange(data.name, c)
  }
  return (
    <div>
      {count.map((p,key) => (
        <Row>
          <Col xs={24}>
          <Typography ><strong>{data.itemText} {key+1}</strong></Typography></Col>
        <Col xs={21}>
          <GetInput onChange={(e,v)=>{onDataChange(e,v,key)}} type={data.child.type} showLabels={showLabels} data={data.child} />
        </Col>
        <Col xs={3}>
        <Form.Item label={showLabels ? " " : null}>
          <Button onClick={()=>{decrement(key)}} danger type="primary" style={{marginTop:3}}>
            <MinusCircleOutlined />
          </Button>
        </Form.Item>
        </Col>
      </Row>
      ))}
      <Space direction="vertical">
        <Button onClick={increment}>
          <PlusOutlined />
        </Button>
      </Space>
    </div>
  );
}
