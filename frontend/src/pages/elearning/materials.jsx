import { Card, Col, Row, Typography } from "antd";
import * as React from "react";
import ElearningService from "../../services/elearning";
import { FileOutlined } from "@ant-design/icons";

export default function Materials() {
  const [dat, setData] = React.useState([]);
  const getData = () => {
    ElearningService.readMaterials().then((r) => {
      setData(r.data);
    });
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Typography.Title>E-Learning materials</Typography.Title>
      <Typography>Click on file to download</Typography>
      <Row>
        {dat.map((prop, key) => (
          <Col xs={24} md={8}>
            <a href={"data:" + prop.file} download={prop.title} target="_BLANK">
              <Card hoverable style={{margin:3}}>
                <div>
                  <Row>
                    <Col xs={4}>
                      <FileOutlined color="primary" size={"large"} style={{fontSize:50}}/>
                    </Col>
                    <Col xs={20}>
                      <Typography><strong>{prop.title}</strong></Typography>
                      <Typography>{prop.description}</Typography>
                    </Col>
                  </Row>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
}
