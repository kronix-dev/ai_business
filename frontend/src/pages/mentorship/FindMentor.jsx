import * as React from "react";
import { Divider, Typography, Row, Col, Button } from "antd";
import KForm from "../../components/form";
import { MentorCard } from "./mentorComponents";
import { Loading } from "../../components/loader";
import { MentorshipService } from "../../services/mentorship";
import { ArrowLeftOutlined } from "@ant-design/icons";
export default function FindMentor({setView}) {
  const [show, setShow] = React.useState(true);
  const [searchResults, setResults] = React.useState([]);
  const onSubmit = (dat) => {
    Loading.showLoader();
    MentorshipService.matchMentor(dat).then((r) => {
      setResults(r.data);
      console.log(r);
      Loading.hideLoader();
      setShow(false);
    });
  };

  return (
    <div>
      <Button onClick={()=>{setView('')}} icon={<ArrowLeftOutlined/>}/>
      {show && (
        <div>
          <Typography.Title level={4}>Find a mentor</Typography.Title>
          <Typography>Describe traits you prefer from your mentor</Typography>
          <KForm
            onSubmit={onSubmit}
            onFormChange={() => {}}
            showSubmitButton
            form={mentorForm}
            submitText={"Search"}
          />
          <Divider />
        </div>
      )}
      <Typography.Title level={4}>Results</Typography.Title>
      <Row>
        {searchResults.map((prop,key) => (
          <Col md={8}>
            <MentorCard data={prop} onSendRequest={()=>{
              let p = searchResults
              p.splice(key)
              setResults(p)
            }} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

const mentorForm = [
  {
    type: "row",
    children: [
      {
        type: "autocomplete",
        placeholder: "Industry",
        name: "industry",
        options: [],
        grid: {
          xs: 12,
          md: 8,
        },
      },
      {
        type: "multiple-select",
        name: "experience_area",
        placeholder: "Area of expertise",
        options: [],
        grid: {
          xs: 12,
          md: 8,
        },
      },
      {
        type: "multiple-select",
        placeholder: "Skills",
        name: "skills",
        options: [],
        grid: {
          xs: 12,
          md: 8,
        },
      },
      {
        type: "multiple-select",
        placeholder: "Mentoring style",
        name: "skills",
        options: [],
        grid: {
          xs: 12,
          md: 8,
        },
      },
      {
        type: "multiple-select",
        placeholder: "Qualifications",
        name: "qualifications",
        options: [],
        grid: {
          xs: 12,
          md: 8,
        },
      },
      {
        type: "text",
        placeholder: "Years of experience",
        name: "experience",
        options: [],
        grid: {
          xs: 12,
          md: 8,
        },
      },
      {
        type: "textarea",
        placeholder: "Other criterias",
        name: "other_criteria",
        options: [],
        grid: {
          xs: 24,
          md: 24,
        },
      },
      {
        type: "checkbox",
        placeholder: "Save search preferences",
        name: "saveSearch",
        options: [],
        grid: {
          xs: 24,
          md: 24,
        },
      },
    ],
  },
];
