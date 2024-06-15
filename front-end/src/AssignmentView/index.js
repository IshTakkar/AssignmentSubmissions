import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { ajax } from "../Services/fetchService";
import {
  Form,
  Col,
  Row,
  Button,
  Container,
  Badge,
  Dropdown,
} from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [assignmentData, setAssignmentData] = useState(null);
  const [assignmentEnum, setAssignmentEnum] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const assignmentId = window.location.href.split("/assignments/")[1];

  useEffect(() => {
    async function fetchData() {
      const data = await ajax(`/api/assignments/${assignmentId}`, "GET", jwt);

      setAssignmentData(data.assignment);
      setAssignmentEnum(data.assignmentEnum);
      setAssignmentStatuses(data.assignmentStatuses);
      console.log(data.assignmentStatuses);
    }
    fetchData();
  }, []);

  const updateAssignment = (prop, value) => {
    const newAssignmentData = { ...assignmentData };
    newAssignmentData[prop] = value;
    setAssignmentData(newAssignmentData);
  };

  const save = async () => {
    const data = await ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, {
      ...assignmentData,
      status: assignmentStatuses[1].status,
    });
    setAssignmentData(data);
  };

  return (
    <>
      {assignmentData ? (
        <Container className="m-3">
          <h2>
            Assignment ID: {assignmentData.id}{" "}
            <h5 style={{ display: "inline" }}>
              <Badge className="mb-2" pill bg="dark">
                {assignmentData.status}
              </Badge>
            </h5>
          </h2>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextAssNumber"
          >
            <Form.Label column sm="2">
              Assignment Number:
            </Form.Label>
            <Col sm="10">
              <DropdownButton
                id="dropdown-basic-button"
                title={
                  assignmentData.number
                    ? `Assignment ${assignmentData.number}`
                    : "Select a Number"
                }
                onSelect={(e) => {
                  updateAssignment("number", e);
                }}
              >
                {assignmentEnum.map((name, idx) => {
                  return (
                    <Dropdown.Item key={idx} eventKey={name.assignmentNum}>
                      {name.assignmentNum}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextURL">
            <Form.Label column sm="2">
              GitHub URL:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="url"
                // id="githubUrl"
                placeholder="https://github.com/username/repo-name"
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                value={assignmentData.githubUrl ? assignmentData.githubUrl : ""}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPassword">
            <Form.Label column sm="2">
              Branch:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="branch-name"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignmentData.branch ? assignmentData.branch : ""}
              />
            </Col>
          </Form.Group>

          <Button onClick={save}>Submit Assignment</Button>
        </Container>
      ) : null}
    </>
  );
};

export default AssignmentView;
