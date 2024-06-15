import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "./util/useLocalStorage";
import { useState } from "react";
import CodeReviewerDashboard from "./CodeReviewerDashboard";

const getRolesFromJwt = (jwt) => {
  if (jwt) {
    const jwtDecoded = jwtDecode(jwt);
    console.log(jwtDecoded);
    return jwtDecoded.authorities;
  }
  return [];
};

function App() {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJwt(jwt));

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            {roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
              <CodeReviewerDashboard />
            ) : (
              <Dashboard />
            )}
          </PrivateRoute>
        }
      />
      <Route
        path="/assignments/:id"
        element={
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
