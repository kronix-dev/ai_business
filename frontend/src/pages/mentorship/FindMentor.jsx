import * as React from "react";
import { Divider, Typography, Row, Col } from "antd";
import KForm from "../../components/form";
import { MentorCard } from "./mentorComponents";
import { Loading } from "../../components/loader";
import { MentorshipService } from "../../services/mentorship";
export default function FindMentor() {
  const onSubmit = (dat) => {
    Loading.showLoader();
    MentorshipService.matchMentor(dat);
  };
  const [searchResults, setResults] = React.useState(['','']);
  return (
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
      <Typography.Title level={4}>Results</Typography.Title>
      <Row>
        {searchResults.map((prop) => (
          <Col md={8}>
            <MentorCard />
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
