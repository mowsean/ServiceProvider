import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";

import "./Tooltip.css";

class Tooltip extends Component {
  render() {
    // IMPORTANT: title value must match data-for attribute value given to tooltip target
    // Example: <SomeRandomTooltipTarget data-tip data-for={title} />
    const { title, description } = this.props;

    return (
      <ReactTooltip className="tooltip" id={title} effect="solid">
        <div className="tooltip__title">{title}</div>
        {description && (
          <div className="tooltip__description">{description}</div>
        )}
      </ReactTooltip>
    );
  }
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default Tooltip;
