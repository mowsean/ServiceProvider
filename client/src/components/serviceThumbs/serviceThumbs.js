import React, { Component } from "react";
import "./serviceThumbs.css";
import { Link } from "react-router-dom";
class ServiceThumbs extends Component {
  render() {
    debugger;
    const {
      isLoading,
      categories
      //   selectCategory,
      //   selectedCategory,
    } = this.props;

    return (
      <div className="row col-md-12 mb-2 margin-0 mt-3">
        {categories &&
          categories.map(category => (
            <div className="col-md-6">
              <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                  <strong className="d-inline-block mb-2 text-success">
                    Logo
                  </strong>
                  <h3 className="mb-0">
                    <Link className="text-dark" to="/smartservices">
                      {category.cat_name}
                    </Link>
                  </h3>
                  <div className="mb-1 text-muted">Mar 18</div>
                  <p className="card-text mb-auto">
                    {category.cat_description}
                  </p>
                  <Link to="/">Book Now!</Link>
                </div>
                <img
                  className="img-services card-img-right flex-auto d-none d-md-block"
                  data-src="holder.js/200x250?theme=thumb"
                  alt="Thumbnail [200x250]"
                  src={"images/thumbnail/" + category.cat_thumbnail}
                  data-holder-rendered="true"
                />
              </div>
            </div>
          ))}
      </div>
    );
  }
}
export default ServiceThumbs;
