import React from "react";
import "./Scoreboard.css";

const Scoreboard = ({ score }) => (
  <div className="scoreboard">
    <p>Score: {score}</p>
  </div>
);

export default Scoreboard;
