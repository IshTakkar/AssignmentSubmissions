import React from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");

  return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
