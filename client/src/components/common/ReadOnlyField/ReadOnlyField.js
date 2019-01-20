import React from "react";
import PropTypes from "prop-types";
import "./ReadOnlyField.css";

class ReadOnlyField extends React.Component {
  render() {
    const { label, value } = this.props;

    return (
      <div>
        <label className="readOnlyField__label">{label}</label>
        <div className="readOnlyField__value">{value ? value : "- -"}</div>
      </div>
    );
  }
}

ReadOnlyField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default ReadOnlyField;
