import {
  compareDates,
  formatDateIgnoringTimezone,
  isValidDate
} from "utils/datetime";

/**
 * @function getCount
 * @param {Object[]} items - A collection of Objects
 * @param {string} selectedValue - What is the selectedValue we're looking for?
 * @param {string} fieldName - The Object key
 * @description
 *   Get the count of items with a particular value in a collection.
 * @return {number} How many items in the collection have a particular value, for a specified fieldName?
 * */
export const getCount = (items, selectedValue, fieldName) => {
  if (!items || !items.length) return 0;

  if (!selectedValue) return items.length;

  return items.filter(item => item[fieldName] === selectedValue).length;
};

/**
 * @function sortByField
 * @param {Object[]} items - A collection of Objects
 * @param {string} fieldName - The Object key
 * @param {number} [sortDirection=1] - Sort direction (1 | -1), defaults to 1 (ascending).
 * @description
 *   Sort items in a collection by fieldName and sortDirection
 * @return {Object[]} A sorted list of Objects
 * */
export const sortByField = (items, fieldName, sortDirection = 1) => {
  if (!items.length) return items;

  const itemsCopy = items.slice();
  const valType = typeof items[0][fieldName]; // assume all values in this field are the same type

  let sortFn;

  if (valType === "string") {
    sortFn =
      sortDirection === -1 ? sortStringsDescending : sortStringsAscending;
  } else if (valType === "number") {
    sortFn =
      sortDirection === -1 ? sortNumbersDescending : sortNumbersAscending;
  } else if (isValidDate(items[0][fieldName])) {
    sortFn = sortDirection === -1 ? sortDatesDescending : sortDatesAscending;
  }

  if (!sortFn)
    throw Error("sortByField only supports number, string, or date values");

  return sortFn(itemsCopy, fieldName);
};

/**
 * @function sortNumbersAscending
 * @param {Object[]} items - A collection of Objects
 * @param {string} fieldName - The Object key
 * @description
 *   Sorts items in a collection by fieldName in ascending order
 * @return {Object[]} A sorted list of Objects
 * */
const sortNumbersAscending = (items, fieldName) =>
  items.sort((a, b) => {
    return a[fieldName] - b[fieldName];
  });

/**
 * @function sortNumbersDescending
 * @param {Object[]} items - A collection of Objects
 * @param {string} fieldName - The Object key
 * @description
 *   Sorts items in a collection by fieldName in descending order
 * @return {Object[]} A sorted list of Objects
 * */
const sortNumbersDescending = (items, fieldName) =>
  items.sort((a, b) => {
    return b[fieldName] - a[fieldName];
  });

/**
 * @function sortStringsAscending
 * @param {Object[]} items - A collection of Objects
 * @param {string} fieldName - The Object key
 * @description
 *   Sorts items in a collection by fieldName in ascending order
 * @return {Object[]} A sorted list of Objects
 * */
export const sortStringsAscending = (items, fieldName) =>
  items.sort((a, b) => {
    if (a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) return -1;
    if (a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) return 1;
    return 0;
  });

/**
 * @function sortStringsDescending
 * @param {Object[]} items - A collection of Objects
 * @param {string} fieldName - The Object key
 * @description
 *   Sorts items in a collection by fieldName in descending order
 * @return {Object[]} A sorted list of Objects
 * */
export const sortStringsDescending = (items, fieldName) =>
  items.sort((a, b) => {
    if (a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) return -1;
    if (a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) return 1;
    return 0;
  });

/**
 * @function sortStringsDescending
 * @param {Object[]} items - A collection of Objects
 * @param {string} fieldName - The Object key
 * @description
 *   Sorts items in a collection by fieldName in descending order
 * @return {Object[]} A sorted list of Objects
 * */
const sortDatesAscending = (items, fieldName) =>
  items.sort((a, b) => compareDates(a[fieldName], b[fieldName]));

/**
 * @function sortStringsDescending
 * @param {Object[]} items - A collection of Objects
 * @param {string} fieldName - The Object key
 * @description
 *   Sorts items in a collection by fieldName in descending order
 * @return {Object[]} A sorted list of Objects
 * */
const sortDatesDescending = (items, fieldName) =>
  items.sort((a, b) => compareDates(b[fieldName], a[fieldName]));

/**
 * @function invertSortDirection
 * @param {string} sortDirection - 'ascending' | 'descending'
 * @description
 *   Inverts a sort direction string
 * @return {string} 'ascending' | 'descending'
 * */
export const invertSortDirection = sortDirection => {
  return sortDirection === "ascending" ? "descending" : "ascending";
};

export const getSortDirectionEnumValue = sortDirection => {
  return sortDirection === "ascending" ? 1 : -1;
};

export const getFieldToStringOrEmptyString = field => {
  if (field !== null) {
    return field.toString();
  }

  return "";
};

export const convertDateToUtcDateString = (value, format) => {
  return formatDateIgnoringTimezone(value, format);
};

export const convertStringListToSelectOptions = list =>
  list.map((label, value) => ({
    label,
    value
  }));
