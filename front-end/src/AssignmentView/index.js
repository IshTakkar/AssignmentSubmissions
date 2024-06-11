import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import { ajax } from "../Services/fetchService";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [assignmentData, setAssignmentData] = useState(null);

  const assignmentId = window.location.href.split("/assignments/")[1];

  const updateAssignment = (prop, value) => {
    const newAssignmentData = { ...assignmentData };
    newAssignmentData[prop] = value;
    setAssignmentData(newAssignmentData);
    console.log(newAssignmentData);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await ajax(`/api/assignments/${assignmentId}`, "GET", jwt);
      setAssignmentData(data);
    }
    fetchData();
  }, []);

  const save = async () => {
    const data = await ajax(
      `/api/assignments/${assignmentId}`,
      "PUT",
      jwt,
      assignmentData
    );
    setAssignmentData(data);
  };

  return (
    <>
      <div>{assignmentId}</div>
      {assignmentData ? (
        <>
          <h2>{assignmentData.status}</h2>
          <h3>
            Github URL:{" "}
            <input
              type="url"
              id="githubUrl"
              onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              value={assignmentData.githubUrl ? assignmentData.githubUrl : ""}
            />
          </h3>
          <h3>
            Branch:{" "}
            <input
              type="text"
              id="branch"
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignmentData.branch ? assignmentData.branch : ""}
            />
          </h3>
          <button onClick={save}>Submit Assignment</button>
        </>
      ) : null}
    </>
  );
};

export default AssignmentView;
