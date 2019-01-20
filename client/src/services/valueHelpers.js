/**
 * @function prettyBool
 * @param {boolean} value - boolean to be converted
 * @param {boolean} extended - boolean to denote if an extended string should be returned
 * @description
 * Function that returns pretty display string representing boolean
 * @returns {string} - pretty display string
 */
const prettyBool = (value, extended) => {
  if (extended) {
    return value ? "YES" : "NO";
  }

  return value ? "Y" : "N";
};

/**
 * @function prettyDate
 * @param {string} date - date to be formatted in en-US format
 * @description
 * Function that returns pretty display date
 * @returns {object} - formatted date object
 */
const prettyDate = date => new Date(date).toLocaleString("en-US");

/**
 * @function isEmpty
 * @param {string} value - value to be checked
 * @description
 * Function that checks if a value is empty
 * @returns {boolean} - boolean that denotes if supplied value is empty
 */
const isEmpty = value =>
  !isNullOrUndefined(value) && value.toString().trim().length ? false : true;

/**
 * @function isNullOrUndefined
 * @param {string} value - value to be checked
 * @description
 * Function that checks if a value is null or undefined
 * @returns {boolean} - boolean that denotes if supplied value is null or undefined
 */
const isNullOrUndefined = value => value === null || value === undefined;

/**
 * @function isEmptyOrNull
 * @param {string} value - value to be formatted
 * @description
 * Function that checks if a value is empty or null
 * @returns {boolean} - boolean that denotes if supplied value is empty or null
 */
const isEmptyOrNull = value => isEmpty(value) || isNullOrUndefined(value);

/**
 * @function formatValue
 * @param {string} value - value to be formatted
 * @param {string} [type] - type of the value to be formatted
 * @param {boolean} [extended] - boolean to denote if an extended string should be returned
 * @description
 * Service that returns formatted value or a placeholder for null/empty values
 * @returns {string} - formatted value or placeholder
 */
export const formatValue = (value, type, extended) => {
  if (type === "bool") {
    return prettyBool(value, extended);
  }

  if (type === "date" && !isEmptyOrNull(value)) {
    // needed to type check because some expected date strings are coming in as 0
    return typeof value !== "string" ? " - - " : prettyDate(value);
  }

  return isEmptyOrNull(value) ? " - - " : value.toString();
};

export const formatPhoneNumber = value => {
  if (!value || value.length !== 10) return null; // expect the phone number to be 10 digits

  return `(${value.substring(0, 3)}) ${value.substring(
    3,
    6
  )} - ${value.substring(6, 10)}`;
};
