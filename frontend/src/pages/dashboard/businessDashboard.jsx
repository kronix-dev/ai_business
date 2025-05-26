import * as React from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Typography,
} from "antd";
import { useUserContext } from "../../controllers/userContext";
import KModal from "../../components/modal";
import KForm from "../../components/form";
import { DashboardCard } from "../../components/dashboardItems";
import {
  BarChartOutlined,
  LineChartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import BusinessService from "../../services/business";
import Budgeting from "../../services/budgeting";
export default function BusinessOwnerDashboard() {
  const { business, setBusiness } = useUserContext();
  const [hasProfile, setHas] = React.useState(0);
  const getProfile = () => {
    BusinessService.getProfile().then((r) => {
      if (r.hasProfile) {
        setBusiness(r.data);
        setHas(1);
      } else {
        setHas(2);
      }
    });
  };
  React.useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      {hasProfile === 1 ? (
        <BusinessDashboard />
      ) : hasProfile === 2 ? (
        <BusinessProfileInit onRefresh={getProfile} />
      ) : null}
    </div>
  );
}

function BusinessProfileInit({ onRefresh }) {
  const { user } = useUserContext();
  const [open, setOpen] = React.useState();
  const [cats, setCats] = React.useState([]);
  const [data, setData] = React.useState({});
  const onCreate = () => {
    BusinessService.createProfile(data);
    onRefresh();
    setOpen(false);
  };
  const businessProfileForm = [
    {
      type: "row",
      children: [
        {
          type: "text",
          name: "name",
          placeholder: "Business name",
          grid: {
            xs: 12,
            md: 12,
            sm: 12,
          },
        },
        {
          type: "autocomplete",
          placeholder: "Industry",
          name: "industry",
          options: cats.map((prpo) => ({ label: prpo.name, value: prpo.id })),
          grid: {
            xs: 12,
            md: 12,
            sm: 12,
          },
        },
      ],
    },
    {
      type: "row",
      children: [
        {
          type: "select",
          placeholder: "Business size",
          name: "size",
          grid: {
            xs: 24,
            md: 8,
            sm: 12,
          },
          options: [
            { label: "1 employee", value: "1" },
            { label: "2 employees", value: "2-4" },
            { label: "5 - 10 employees", value: "5-10" },
          ],
        },
        {
          type: "select",
          placeholder: "Business stage",
          name: "stage",
          grid: {
            xs: 24,
            md: 8,
            sm: 12,
          },
          options: [
            { label: "Startup", value: "startup" },
            { label: "Medium business", value: "medium" },
            { label: "Experienced business", value: "experienced" },
          ],
        },
        {
          type: "number",
          placeholder: "Monthly revenue",
          name: "revenue",
          grid: {
            xs: 24,
            md: 8,
            sm: 12,
          },
          options: [
            { label: "Startup", value: "startup" },
            { label: "Medium business", value: "medium" },
            { label: "Experienced business", value: "experienced" },
          ],
        },
      ],
    },

    {
      type: "multiple-select",
      placeholder: "Goals",
      name: "goals",
      options: [],
    },
  ];
  const onChange = (d) => {
    setData(d);
  };
  React.useEffect(() => {
    BusinessService.getIndustries().then((r) => {
      setCats(r.data);
    });
  }, []);
  const save = () => {};
  return (
    <div>
      <Row>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>
          <Card>
            <center>
              <Avatar style={{ height: 100, width: 100 }} size={"large"} />
              <Typography.Title style={{ textAlign: "center" }}>
                Hello there {user.fname}, welcome to Inua Mwanamke
              </Typography.Title>
              <Typography>
                I am your business assistant, im here to help you on your
                journey
              </Typography>
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
                style={{ marginTop: 12 }}
              >
                Get Started
              </Button>
            </center>
          </Card>
        </Col>
      </Row>
      <KModal
        okText="save"
        title="Tell us about your business"
        open={open}
        setOpen={setOpen}
        onOk={onCreate}
      >
        <KForm
          form={businessProfileForm}
          submitText="Save"
          onFormChange={(form) => {
            setData(form);
          }}
          showLabels={true}
        />
      </KModal>
    </div>
  );
}

function BusinessDashboard() {
  const [data, setData] = React.useState({});
  const [ai, setAi] = React.useState([]);

  const getData = ()=>{
    Budgeting.getAISummary().then(r=>{
      setAi(r.data)
    })
    Budgeting.getSummary().then(r=>{
      setData(r.data)
    })
  }
  React.useEffect(()=>{
    getData()
  },[])
  return (
    <Row>
      <Col xs={24} md={6}>
        <DashboardCard
          avatar={<BarChartOutlined />}
          title={"Total revenue"}
          value={data.allSales}
        />
      </Col>
      <Col xs={24} md={6}>
        <DashboardCard
          avatar={<LineChartOutlined color="#000" />}
          title={"Total expenditures"}
          value={data.allExpenses}
        />
      </Col>
      <Col xs={24} md={6}>
        <DashboardCard
          avatar={<BarChartOutlined color="#000" />}
          title={"Past 30 days revenue"}
          value={data.monthlySales}
        />
      </Col>
      <Col xs={24} md={6}>
        <DashboardCard
          avatar={<LineChartOutlined color="#000" />}
          title={"Past 30 expenditures"}
          value={data.monthlyExpenses}
        />
      </Col>
      <Col xs={24}></Col>
      <Col xs={24} md={24}>
        <Card style={{ marginTop: 4, marginRight: 4 }}>
          <Typography>
            <MessageOutlined />
            &nbsp;<strong>AI Suggestions</strong>
          </Typography>
          <Divider />
          {ai.map((prop) => (
            <Alert
              banner
              type="info"
              message={
                <div>
                  <Typography>
                    <strong>Weekly AI suggestion</strong>
                  </Typography>
                  <Typography>{prop.message}</Typography>
                </div>
              }
              closable={false}
            ></Alert>
          ))}
        </Card>
      </Col>
    </Row>
  );
}
