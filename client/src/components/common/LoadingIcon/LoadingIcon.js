import React from "react";
import "./LoadingIcon.css";

const LoadingIcon = props => (
  <div style={{ width: "100%" }}>
    <img
      src={`images/spinner.gif`}
      alt="loading..."
      style={{ marginLeft: "50%" }}
      className="spinner"
    />
  </div>
);

export default LoadingIcon;
