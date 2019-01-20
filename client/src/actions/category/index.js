import { categoryActionTypes } from "./actionTypes";
import * as categoryService from "../../services/category";
import { errorActionHandler } from "../errorActionHandler";

export const fetchCategories = () => dispatch => {
  debugger;
  dispatch({ type: categoryActionTypes.CATEGORIES.FETCH_REQUEST });

  categoryService
    .fetchCategories()
    .then(categories => {
      debugger;
      dispatch({
        type: categoryActionTypes.CATEGORIES.FETCH_SUCCESS,
        categories
      });
    })
    .catch(
      errorActionHandler(dispatch, {
        type: categoryActionTypes.CATEGORIES.FETCH_FAILURE
      })
    );
};

/**
 * @function selectCategory
 * @description
 *   Dispatches an action to either select or deselect a cat_id
 * @param {number} cat_id  - Category id
 * @param {boolean} [isDeselect]  - Are we deselecting? Defaults to false.
 * @returns {function} an anonymous thunk wrapper function
 * */

export const selectCategory = (cat_id, isDeselect = false) => dispatch => {
  if (isDeselect) {
    dispatch({ type: categoryActionTypes.CATEGORY.DESELECT, cat_id });
  } else {
    dispatch({ type: categoryActionTypes.CATEGORY.SELECT, cat_id });
  }
};
