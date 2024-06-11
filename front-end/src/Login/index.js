import React, { useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

const Login = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const sendLoginRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jwt = await response.headers.get("authorization");
      if (jwt) {
        setJwt(jwt);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label htmlFor="username" className="fs-3">
            Username
          </Form.Label>
          <Form.Control
            type="email"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label htmlFor="password" className="fs-3">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Row>
          <Col className="d-flex flex-column">
            <div>
              <Button id="submit" type="submit" onClick={sendLoginRequest}>
                Login
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
