import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import { ajax } from "../Services/fetchService";
import { Card, Row, Col, Container, Button } from "react-bootstrap";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await ajax("/api/assignments", "GET", jwt);
      setAssignments(data);
    }
    fetchData();
  }, []);

  const createAssignment = async () => {
    const response = await fetch("/api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    });

    const data = await response.json();
    window.location.href = `/assignments/${data.id}`;
  };

  return (
    <div className="m-5">
      <Button className="m-2" onClick={createAssignment}>
        Submit New Assignment
      </Button>

      <Container>
        <Row>
          {assignments
            ? assignments.map((assignment) => (
                <Col>
                  <Card
                    className="mt-5"
                    style={{ width: "18rem" }}
                    key={assignment.id}
                  >
                    <Card.Body className="d-flex flex-column justify-content-around">
                      <Card.Title>Assignment ID: {assignment.id}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {assignment.status}
                      </Card.Subtitle>
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
                      <Link
                        to={`/assignments/${assignment.id}`}
                        className="link-primary link-underline-opacity-0"
                      >
                        Edit
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
