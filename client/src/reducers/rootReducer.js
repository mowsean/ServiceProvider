import { combineReducers } from "redux";
import categories, * as categorySelectors from "./category";

export default combineReducers({
  categories
});

export const getCategories = state =>
  categorySelectors.getCategories(state.categories);
export const getCategoryIsFetching = state =>
  categorySelectors.getCategoryIsFetching(state.categories);
