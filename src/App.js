import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Map from "./components/Map";
import Chart from "./components/Chart";
import SelfCheck from "./components/SelfCheck";
import Information from "./components/Information";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";

require("es6-promise").polyfill();
require("isomorphic-fetch");

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://corona.lmao.ninja/v2/countries")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <Navbar
        bg="dark"
        variant="dark"
        fixed="top"
        expand="xxl"
        collapseOnSelect
      >
        <Navbar.Brand>
          <img
            src="http://theta.utoronto.ca/sites/default/files/glazed-cms-media/covid_logo.jpg?fid=882"
            width="250px"
            height="40px"
            alt=""
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="map">Map</Nav.Link>
            <Nav.Link href="chart">Chart</Nav.Link>
            <Nav.Link href="information">Info</Nav.Link>
            <Nav.Link href="selfcheck">Self Check</Nav.Link>
          </Nav>
          <Nav>
            <SocialIcon
              url="https://linkedin.com/in/paultaelee"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://github.com/ptds106/"
              bgColor="lightblue"
              style={{ height: 40, width: 40 }}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/map" element={<Map data={data} />} />
        <Route path="/chart" element={<Chart data={data} />} />
        <Route path="/information" element={<Information />} />
        <Route path="/selfcheck" element={<SelfCheck />} />
      </Routes>
    </div>
  );
}
export default App;
