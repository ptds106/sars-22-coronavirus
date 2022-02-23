import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { MDBCol, MDBIcon } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./styles.css";

export default function Chart({ data }) {
  const [name, setName] = useState("");

  const [foundUsers, setFoundUsers] = useState(data);
  useEffect(() => {
    setFoundUsers(data);
  }, [data]);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = data.filter((user) => {
        return user.country.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(data);
    }
    setName(keyword);
  };

  let columns = foundUsers[0] && Object.keys(data[0]);
  if (columns !== undefined) {
    columns.splice(0, 1);
    columns.splice(1, 1);
  }

  return (
    <div className="charts">
      <MDBCol md="6">
        <div className="input-group md-form form-lg form-2 pl-0">
          <div className="input-group-prepend">
            <span className="input-group-text green lighten-1" id="basic-text1">
              <MDBIcon className="text-white" icon="search" />
            </span>
          </div>
          <input
            className="form-control my-0 py-1"
            type="text"
            value={name}
            placeholder="Search country"
            aria-label="Search country"
            onChange={filter}
          />
        </div>
      </MDBCol>

      <Table bordered size="xl">
        <thead>
          <tr>
            {foundUsers[0] &&
              columns.map((heading, keys) => <th key={keys}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {foundUsers.map((row, keys) => (
            <tr key={keys}>
              {columns.map((column, keys) => (
                <td key={keys}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
