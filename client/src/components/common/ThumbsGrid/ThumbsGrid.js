import React from "react";
import PropTypes from "prop-types";
import "./ThumbsGrid.css";

const ThumbsGrid = ({
  prefixContent,
  headingText,
  bodyText,
  imageSource,
  isSelected,
  onFocus = () => {},
  children
}) => (
  <div className="col-md-6">
    <div className="card flex-md-row mb-4 box-shadow h-md-250">
      <div className="card-body d-flex flex-column align-items-start">
        {prefixContent && (
          <strong className="d-inline-block mb-2 text-success">
            {prefixContent}
          </strong>
        )}
        <h3 className="mb-0">
          {headingText && (
            <Link className="text-dark" to="/smartservices">
              {headingText}
            </Link>
          )}
        </h3>
        {/* <div className="mb-1 text-muted">Mar 18</div> */}
        {bodyText && <p className="card-text mb-auto">{bodyText}</p>}
        <Link to="/">Book Now!</Link>
      </div>
      {imageSource && (
        <img
          className="img-services card-img-right flex-auto d-none d-md-block"
          data-src="holder.js/200x250?theme=thumb"
          alt="Thumbnail [200x250]"
          src={imageSource}
          data-holder-rendered="true"
        />
      )}
    </div>
    {isSelected && <div className="thumbItem__isSelectedDecoration" />}
  </div>
);

ThumbsGrid.propTypes = {
  prefixContent: PropTypes.object,
  headingText: PropTypes.string,
  bodyText: PropTypes.string,
  imageSource: PropTypes.string,
  isSelected: PropTypes.bool,
  onFocus: PropTypes.func,
  children: PropTypes.object
};

export default ThumbsGrid;
