import React from "react";
import PropTypes from "prop-types";
import "./ListItem.css";

const ListItem = ({
  prefixContent,
  headingText,
  bodyText,
  isSelected,
  onFocus = () => {},
  children
}) => (
  <div className="listItem">
    {prefixContent && (
      <div className="listItem__rowPrefix">{prefixContent}</div>
    )}
    <div className="listItem__col">
      {headingText && (
        <header className="listItem__header">{headingText}</header>
      )}
      {bodyText && <div className="listItem__body">{bodyText}</div>}
      {children}
    </div>
    {isSelected && <div className="listItem__isSelectedDecoration" />}
  </div>
);

ListItem.propTypes = {
  prefixContent: PropTypes.object,
  headingText: PropTypes.string,
  bodyText: PropTypes.string,
  isSelected: PropTypes.bool,
  onFocus: PropTypes.func,
  children: PropTypes.object
};

export default ListItem;
