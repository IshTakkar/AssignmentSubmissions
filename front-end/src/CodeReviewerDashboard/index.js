import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import { ajax } from "../Services/fetchService";
import { Card, Row, Col, Container, Button, Badge } from "react-bootstrap";
import "../App.css";

const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [assignments, setAssignments] = useState(null);

  const claimAssignment = async (assignment) => {
    assignment.status = "In Review";
    const response = await ajax(
      `/api/assignments/${assignment.id}`,
      "PUT",
      jwt,
      assignment
    );
    // TODO: update assignment update logic
    
    // const assignmentsCopy = { ...assignments };
    // const idx = assignmentsCopy.find(a => a.id === assignment.id)
    // assignmentsCopy[idx] = response
    // setAssignments(assignmentsCopy)
  };

  useEffect(() => {
    async function fetchData() {
      const data = await ajax("/api/assignments", "GET", jwt);
      setAssignments(data);
    }
    fetchData();
  }, []);

  return (
    <div className="m-5">
      <div className="d-flex justify-content-between">
        <Button
          className="m-2"
          variant="warning"
          onClick={() => {
            setJwt(null);
            window.location.href = "/login";
          }}
        >
          Logout
        </Button>
      </div>

      <Container>
        <Row>
          <div className="assignment-wrapper">
            <div
              className="h3"
              style={{
                marginTop: "-1.4em",
                maxWidth: "fit-content",
                background: "white",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              Awaiting Review
            </div>
            {assignments
              ? assignments.map((assignment) => (
                  <Col>
                    <Card
                      className="mt-3"
                      style={{ width: "18rem" }}
                      key={assignment.id}
                    >
                      <Card.Body
                        className="d-flex flex-column justify-content-around"
                        style={{ maxHeight: "250px", minHeight: "200px" }}
                      >
                        <Card.Title>
                          Assignment ID: {assignment.number}
                        </Card.Title>
                        <Badge
                          className="mb-2"
                          style={{ maxWidth: "fit-content" }}
                          pill
                          bg="dark"
                        >
                          {assignment.status}
                        </Badge>
                        <Card.Text>
                          <p>
                            <b>GitHub URL: </b>
                            {assignment.githubUrl}
                          </p>
                          <p>
                            <b>Branch: </b>
                            {assignment.branch}
                          </p>
                        </Card.Text>
                        <Button
                          onClick={() => {
                            claimAssignment(assignment);
                          }}
                        >
                          Claim
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : null}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default CodeReviewerDashboard;
