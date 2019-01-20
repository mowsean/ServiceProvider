import { combineReducers } from "redux";
import categories, * as categorySelectors from "../../../reducers/category";

const categories = combineReducers({ categories });

export default categories;

//selectors
export const getCategoryIsFetching = state =>
  categorySelectors.getCategoryIsFetching(state.categories);

export const getCategories = state =>
  categorySelectors.getCategories(state.categories);

// export const getCategoriesCount = state => categorySelectors.getCategoriesCount(state.categories);

// export const getSelectedCategory = state => categorySelectors.getSelectedCategory(state.categories);

// export const getCategoryByID = (state, cat_id) => categorySelectors.getCategoryByID(state.categories, cat_id);

// export const getSortBy = state => categorySelectors.getSortBy(state.categories);

// export const getQuickActionRole = state => categorySelectors.getQuickActionCategory(state.categories);
