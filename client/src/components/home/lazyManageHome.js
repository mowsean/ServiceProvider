import React from "react";
import PropTypes from "prop-types";
import { injectAsyncReducer, removeAsyncReducer } from "../../configureStore";
//import { manageCategoryReducer } from './reducers';
import { manageCategoryReducer } from "./reducers";
import { ManageHome } from "./manageHome";

class LazyManageHome extends React.Component {
  constructor(props) {
    super(props);
    //  injectAsyncReducer(this.props.store, 'manageHome', manageCategoryReducer)
  }

  componentWillMount() {
    //  removeAsyncReducer(this.props.store, 'manageHome');
  }

  render() {
    return <ManageHome {...this.props} />;
  }
}

LazyManageHome.propTypes = {
  store: PropTypes.object.isRequired
};

export default LazyManageHome;
