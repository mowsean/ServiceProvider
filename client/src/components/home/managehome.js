import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import NavBar from '../NavBar';
// import Footer from '../components/footer.js';
import Jumbotron from "../jumbotron";
import ServiceThumbs from "../serviceThumbs";
//import ServiceResult from '../serviceResult';

import { fetchCategories } from "../../actions/category";

import {
  getCategories,
  getCategoryIsFetching
} from "../../reducers/rootReducer";

class ManageHome extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    debugger;
    const { categories, isFetching } = this.props;

    return (
      <div>
        <Jumbotron />
        <ServiceThumbs categories={categories} isLoading={isFetching} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getCategoryIsFetching(state),
  categories: getCategories(state)
});

const mapDispatchToProps = {
  fetchCategories
};

ManageHome.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchCategories: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchCategories })(ManageHome);
