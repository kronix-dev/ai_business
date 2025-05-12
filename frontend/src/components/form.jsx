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
import { useForm, Controller } from "react-hook-form";
export default function KForm({
  form,
  onSubmit = () => {
    alert("sd");
  },
  submitText = "submit",
  onFormChange = () => {},
  showLabels = false,
  showSubmitButton = false,
  defaultValues = {},
}) {
  const [fieldData, setFieldData] = React.useState({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });
  const onChange = (e, v) => {
    let f = fieldData;
    f[e] = v;
    onFormChange(f);
    setFieldData(f);
    console.log(f);
  };

  return (
    <Form layout="vertical">
      {form.map((prop) =>
        !["row", "pair"].includes(prop.type) ? (
          <Form.Item label={showLabels ? prop.placeholder : null}>
            <GetInput
              onChange={onChange}
              showLabels={showLabels}
              control={control}
              errors={errors}
              type={prop.type}
              data={prop}
              defaultValues={defaultValues}
            />
          </Form.Item>
        ) : (
          <GetInput
            defaultValues={defaultValues}
            errors={errors}
            control={control}
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
            handleSubmit(onSubmit, (erros) => {
              alert(erros.root.message);
            });
          }}
          type="primary"
        >
          {submitText}
        </Button>
      ) : null}
    </Form>
  );
}

function GetInput({
  type,
  data,
  showLabels,
  onChange,
  control,
  errors,
  defaultValues,
}) {
  const InputType = () => {
    switch (type) {
      case "checkbox":
        return <KCheckbox data={data} onChange={onChange} />;
      case "pair":
        return (
          <PairInput
            onChange={onChange}
            showLabels={showLabels}
            data={data}
            errors={errors}
            control={control}
            defaultValues={defaultValues[data.name]}
          />
        );
      case "date":
        return (
          <KDatePicker
            onChange={onChange}
            data={data}
            defaultValues={defaultValues[data.name]}
          />
        );
      case "text":
      case "number":
      case "email":
      case "password":
        return (
          <TextInput
            onChange={onChange}
            data={data}
            defaultValues={defaultValues[data.name]}
          />
        );
      case "textarea":
        return (
          <KTextArea
            onChange={onChange}
            data={data}
            defaultValues={defaultValues[data.name]}
          />
        );
      case "autocomplete":
        return (
          <KAutoComplete
            onChange={onChange}
            data={data}
            defaultValues={defaultValues[data.name]}
          />
        );
      case "select":
        return (
          <SelectInput
            onChange={onChange}
            data={data}
            defaultValues={defaultValues[data.name]}
          />
        );
      case "multiple-select":
        return (
          <MultipleSelectInput
            onChange={onChange}
            data={data}
            defaultValues={defaultValues[data.name]}
          />
        );
      case "row":
        return (
          <KRow
            onChange={onChange}
            data={data}
            control={control}
            errors={errors}
            showLabels={showLabels}
            defaultValues={defaultValues}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div>
      <Controller
        name={data.name !== undefined ? data.name : "d" + Date.now().toString()}
        control={control}
        {...data}
        render={({ field: { value }, fieldState: {} }) => <InputType />}
      />
    </div>
  );
}

function TextInput({ data, onChange = (e, v) => {}, defaultValues = "" }) {
  return (
    <Input
      placeholder={data.placeholder}
      onChange={(v) => {
        onChange(data.name, v.target.value);
      }}
      defaultValue={defaultValues}
      type={data.type}
      id={data.name}
      name={data.name}
    />
  );
}

function KCheckbox({ data, onChange }) {
  return (
    <Space>
      <Checkbox
        id={data.name}
        title={data.name}
        onChange={(c) => {
          onChange(data.name, c.target.checked);
        }}
      />
      <Typography>{data.placeholder}</Typography>
    </Space>
  );
}
function KDatePicker({ data, onChange, defaultValues }) {
  return (
    <DatePicker
      style={{ width: "100%" }}
      placeholder={data.placeholder}
      onChange={(v) => {
        onChange(data.name, v.format("YYYY-MM-DD"));
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
      options={data.options.map((p, key) => ({
        label: p.label,
        value: p.label,
      }))}
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
function KRow({ data, showLabels, onChange, control, errors, defaultValues }) {
  return (
    <Row>
      {data.children.map((item, key) => (
        <Col style={{ padding: 3 }} md={item.grid.md} xs={item.grid.xs}>
          <Form.Item label={showLabels ? item.placeholder : null}>
            <GetInput
              onChange={onChange}
              type={item.type}
              data={item}
              defaultValues={defaultValues}
              errors={errors}
              control={control}
            />
          </Form.Item>
        </Col>
      ))}
    </Row>
  );
}

function PairInput({
  data,
  showLabels,
  onChange,
  control,
  errors,
  defaultValues,
}) {
  const [count, setCount] = React.useState([{}]);
  const [, forceUpdate] = React.useState();
  const increment = () => {
    let c = count;
    c.push({});
    setCount(c);
    forceUpdate({});
  };
  const decrement = (key) => {
    let c = count;
    c.splice(key);
    setCount(c);
  };
  const onDataChange = (name, value, key) => {
    let c = count;
    c[key][name] = value;
    setCount(c);
    onChange(data.name, c);
  };
  return (
    <div>
      {count.map((p, key) => (
        <Row>
          <Col xs={24}>
            <Typography>
              <strong>
                {data.itemText} {key + 1}
              </strong>
            </Typography>
          </Col>
          <Col xs={21}>
            <GetInput
              onChange={(e, v) => {
                onDataChange(e, v, key);
              }}
              defaultValues={defaultValues!==undefined && defaultValues.length>=key? defaultValues[key] : {}}
              type={data.child.type}
              showLabels={showLabels}
              data={data.child}
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs={3}>
            <Form.Item label={showLabels ? " " : null}>
              <Button
                onClick={() => {
                  decrement(key);
                }}
                danger
                type="primary"
                style={{ marginTop: 3 }}
              >
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
