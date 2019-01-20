import React from "react";
import LoadingIcon from "../LoadingIcon";
import PropTypes from "prop-types";
import cssVars from "../../../styles/cssVars";

const globalLoadingStyles = {
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  color: cssVars.colors.brightYellow
};

/**
 * @function GlobalLoading
 * @param {string} [message] - Optional message to display below loading spinner
 * @description
 * This is a global (covers the entire screen) loading indicator. It is designed to be used for states in which
 * 	the user does not have access to the application. (fetching auth info, socket is connecting, etc.)
 * @return {object} - jsx
 */
const GlobalLoading = ({ message }) => (
  <div style={globalLoadingStyles}>
    <LoadingIcon height="10rem" /> {message && <h3> {message} </h3>}{" "}
  </div>
);
GlobalLoading.propTypes = {
  message: PropTypes.string
};

export default GlobalLoading;
