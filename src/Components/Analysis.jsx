// AnalysisPage.js
import React from "react";
import "./css/Analysis.css";
import Overview from "./Overview";
import CenterTop from "./CenterTop";
const Card = ({ title, description }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
const Analysis = () => {
  return (
    <div className="analysis-container">
      <section className="AC1">
        <Overview />
      </section>
      <section className="flex-container">
        <CenterTop />
      </section>
    </div>
  );
};

export default Analysis;
