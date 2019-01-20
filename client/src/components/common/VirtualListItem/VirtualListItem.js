import React from "react";
import PropTypes from "prop-types";

class VirtualListItem extends React.Component {
  render() {
    const { onLoad, style, handleSelect, children } = this.props;

    return (
      <div onLoad={onLoad} style={style}>
        {React.Children.map(children, child => (
          <div>
            {React.cloneElement(child, {
              handleSelect
            })}
          </div>
        ))}
      </div>
    );
  }
}

VirtualListItem.propTypes = {
  onLoad: PropTypes.any.isRequired,
  style: PropTypes.object.isRequired,
  handleSelect: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default VirtualListItem;
