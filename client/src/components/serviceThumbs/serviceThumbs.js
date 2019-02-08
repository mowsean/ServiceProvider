import React, { Component } from "react";
import "./serviceThumbs.css";
import { Link } from "react-router-dom";
import LoadingIcon from "../common/LoadingIcon";

class ServiceThumbs extends Component {
  handleSelect(id) {
    debugger;
    const { selectCategory, selectedCategory } = this.props;
    const isDeselect = !!selectedCategory && selectedCategory.cat_id === id;
    selectCategory(id, isDeselect);
  }

  // isSelected = entity => {
  //   const { selectedCategory } = this.props;
  //   return entity.cat_id === selectedCategory.cat_id;
  // };

  render() {
    const {
      isLoading,
      categories,
      selectCategory,
      selectedCategory
    } = this.props;

    return (
      <div className="row col-md-12 mb-2 margin-0 mt-3">
        {isLoading ? (
          <LoadingIcon />
        ) : (
          categories &&
          categories.map(category => (
            <div className="col-md-6">
              {/* <Link to={`/results/${category.cat_id}`} onClick={this.handleSelect} isSelected={this.isSelected(category)}> */}
              <Link>
                <div
                  onClick={() => this.handleSelect(category.cat_id)}
                  className="card flex-md-row mb-4 box-shadow h-md-250"
                >
                  <div className="card-body d-flex flex-column align-items-start">
                    <h3 className="mb-0">
                      <Link
                        className="text-dark"
                        to={`/results/${category.cat_id}`}
                      >
                        {category.cat_name}
                      </Link>
                    </h3>
                    <div className="mb-1 text-muted" />
                    <p className="card-text mb-auto">
                      {category.cat_description}
                    </p>
                    <Link to={`/results/${category.cat_id}`}>Book Now!</Link>
                  </div>
                  <img
                    className="img-services card-img-right flex-auto d-none d-md-block"
                    data-src="holder.js/200x250?theme=thumb"
                    alt="Thumbnail [200x250]"
                    src={"images/thumbnail/" + category.cat_thumbnail}
                    data-holder-rendered="true"
                  />
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    );
  }
}

ServiceThumbs.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.array,
  selectCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.object
};
export default ServiceThumbs;
