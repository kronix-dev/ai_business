import * as React from "react";
import DataDisplay, { addComponent } from "../../../components/dataDisplay";
import { dataDisplayItemDto } from "../../../components/dto";

export default function ProjectView({ data }) {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let p = [];
    let x = dataDisplayItemDto;
    x.type = "textLabel";
    x.label = "Project name";
    x.value = data.name;
    p.push(addComponent("textLabel", "Project name", data.name));
    p.push(addComponent("textLabel", "Contractor name", data.name));
    p.push(addComponent("textLabel", "Contractor no", data.name));
    p.push(addComponent("textLabel", "Client name ", data.name));
    p.push(addComponent("textLabel", "Contract period ", data.name));
    p.push(addComponent("textLabel", "Contract price", data.name));
    p.push(addComponent("textLabel", "Advance payment", data.name));
    p.push(addComponent("textLabel", "Bank name", data.name));
    p.push(addComponent("textLabel", "Validity period", data.name));
    p.push(addComponent("textLabel", "Start date", data.name));
    p.push(addComponent("textLabel", "End date", data.name));
    setData(p);
  }, []);
  return (
    <div>
      <DataDisplay data={data} />
    </div>
  );
}
