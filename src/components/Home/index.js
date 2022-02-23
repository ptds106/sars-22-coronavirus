import React from "react";
import Clock from "react-live-clock";
import "./styles.css";
const Home = ({ data }) => {
  let totalCase = 0;
  data.forEach((datum) => {
    totalCase += datum.cases;
  });
  let str = totalCase.toLocaleString("en-US");
  return (
    <div
      className="img"
      style={{
        backgroundImage: `url("https://www.mystatmed.com/wp-content/uploads/coronavirus-1920-1080.png")`,
      }}
    >
      <div className="clock">
        <h1>
          <Clock
            format={"YYYY:MM:DD:HH:mm:ss"}
            ticking={true}
            timezone={"US/Pacific"}
          />
        </h1>
        <h1>{str} CASES</h1>
        <h1>and</h1>
        <h1>COUNTING...</h1>
      </div>
    </div>
  );
};
export default Home;
