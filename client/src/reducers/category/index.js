import { combineReducers } from "redux";
import { initialState } from "./initialState";
import { categoryActionTypes } from "../../actions/category/actionTypes";

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case categoryActionTypes.CATEGORIES.FETCH_REQUEST:
      return true;
    case categoryActionTypes.CATEGORIES.FETCH_SUCCESS:
    case categoryActionTypes.CATEGORIES.FETCH_FAILURE:
      return false;
    default:
      return state;
  }
};

const data = (state = initialState.data, action) => {
  switch (action.type) {
    case categoryActionTypes.CATEGORIES.FETCH_REQUEST:
      return initialState.data;
    case categoryActionTypes.CATEGORY.ADD_SUCCESS:
    case categoryActionTypes.CATEGORY.ADD_FAILURE:
      return [...state, action.categories];
    case categoryActionTypes.CATEGORIES.FETCH_SUCCESS:
      return action.categories;
    case categoryActionTypes.CATEGORIES.FETCH_FAILURE:
      return state.data;
    default:
      return state;
  }
};

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case categoryActionTypes.CATEGORIES.FETCH_SUCCESS:
      return null;
    case categoryActionTypes.CATEGORIES.FETCH_FAILURE:
      return action.error;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  data,
  error
});

export const getCategories = state => state.data; //&& searchAndSortEntities(state.data, 'cat_name', state);

export const getCategoryIsFetching = state => state.isFetching;
