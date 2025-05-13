import * as React from "react";
import { Alert, Avatar, Button, Card, Col, Row, Typography } from "antd";
import { useUserContext } from "../../controllers/userContext";
import KModal from "../../components/modal";
import KForm from "../../components/form";
import { DashboardCard } from "../../components/dashboardItems";
import {
  BarChartOutlined,
  LineChartOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import BusinessService from "../../services/business";
import { MentorshipService } from "../../services/mentorship";
export default function MentorDashboardPage() {
  const { business, setBusiness } = useUserContext();
  const [hasProfile, setHas] = React.useState(0);
  const getInfo = () => {
    MentorshipService.getProfile().then((r) => {
      if (r.hasProfile) {
        setBusiness(r.data);
        setHas(1);
      } else {
        setHas(2);
      }
    });
  };
  React.useEffect(() => {
    getInfo();
  }, []);
  return (
    <div>
      {hasProfile === 1 ? (
        <BusinessDashboard />
      ) : hasProfile === 2 ? (
        <BusinessProfileInit
          onRefresh={() => {
            getInfo();
          }}
        />
      ) : null}
    </div>
  );
}

function BusinessProfileInit({onRefresh =()=>{}}) {
  const { user } = useUserContext();
  const [open, setOpen] = React.useState();
  const [cats, setCats] = React.useState([]);
  const [data, setData] = React.useState({});
  const onCreate = () => {
    MentorshipService.createProfile(data).then((r)=>{
      if(r.status){
        onRefresh()
        setOpen(false)
      }
    });
  };
  const businessProfileForm = [
    {
      type: "row",
      children: [
        {
          type: "textarea",
          name: "bio",
          placeholder: "Tell us about yourself",
          grid: {
            xs: 24,
            md: 24,
            sm: 12,
          },
        },
        {
          type: "multiple-select",
          placeholder: "Industry",
          name: "industry",
          options: cats.map((prpo) => ({ label: prpo.name, value: prpo.name })),
          grid: {
            xs: 12,
            md: 12,
            sm: 12,
          },
        },
        {
          type: "multiple-select",
          placeholder: "Skills",
          name: "skills",
          options: [],
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
          type: "multiple-select",
          placeholder: "Qualifications",
          name: "qualifications",
          grid: {
            xs: 24,
            md: 8,
            sm: 12,
          },
          options: [],
        },
        {
          type: "select",
          placeholder: "Experience",
          name: "experience",
          grid: {
            xs: 24,
            md: 8,
            sm: 12,
          },
          options: [
            { label: "Less than a year", value: "<1" },
            { label: "1 Year", value: "1" },
            { label: "5 Years", value: "<5" },
            { label: "More than 5 years", value: "5+" },
          ],
        },
        {
          type: "multiple-select",
          name: "availability",
          placeholder: "Availability",
          grid: {
            xs: 24,
            md: 8,
            sm: 12,
          },
          options: [
            { label: "Sunday", value: "sunday" },
            { label: "Monday", value: "monday" },
            { label: "Tuesday", value: "tuesday" },
            { label: "Wednesday", value: "wednesday" },
            { label: "Thursday", value: "thursday" },
            { label: "Friday", value: "friday" },
            { label: "Saturday", value: "saturday" },
          ],
        },
      ],
    },
    {
      type: "multiple-select",
      placeholder: "Area of expertise in mentoring",
      name: "area_expert",
      grid: {
        xs: 24,
        md: 8,
        sm: 12,
      },
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
              <Typography>We are humbled to have you onboard</Typography>
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
        title="Tell us about yourself"
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
  return (
    <Row>
      <Col xs={24} md={8}>
        <DashboardCard
          avatar={<UserOutlined />}
          title={"Number of Mentees"}
          value={"2"}
        />
      </Col>
    </Row>
  );
}
