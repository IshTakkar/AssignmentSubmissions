import React, { useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { Navigate } from "react-router-dom";

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
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button id="submit" type="submit" onClick={sendLoginRequest}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
