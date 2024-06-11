import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import { ajax } from "../Services/fetchService";

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
    <div>
      {assignments
        ? assignments.map((assignment) => (
            <div key={assignment.id}>
              <Link to={`/assignments/${assignment.id}`}>
                Assignment ID: {assignment.id}
              </Link>
            </div>
          ))
        : null}
      <button onClick={createAssignment}>Submit New Assignment</button>
    </div>
  );
};

export default Dashboard;
