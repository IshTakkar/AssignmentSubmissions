import React, { useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { Navigate } from "react-router-dom";
import { ajax } from "../Services/fetchService";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    ajax(`/api/auth/validate?token=${jwt}`, "GET", jwt).then((isValid) => {
      setIsValid(isValid);
      setIsLoading(false);
    });
  } else return <Navigate to="/login" />;

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
