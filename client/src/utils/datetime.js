import moment from "moment";

export const DATE_TIME_FORMATS = {
  DATABASE_FORMAT: "YYYY-MM-DD HH:mm:ss.SSS", // Possibly not needed
  DATEBASE_FORMAT_WITHOUT_SECONDS: "YYYY-MM-DD HH:mm",
  DATE_FULL_MONTH_AND_YEAR: "MMMM YYYY",
  DATE_SHORT: "MM/DD/YYYY",
  DATE_TIME_SHORT_MONTH: "MMM DD, YYYY HH:mm a",
  DATE_WITH_ZERO_TIME: "Y-M-D 00:00:00",
  DATE_WITH_YEAR_TIME_WITH_AMPM_FORMAT: "MM/DD/YY, h:mm a",
  DATE_WITH_YEAR_TIME_WITH_AMPM_NO_COMMA: "MM/DD/YY h:mm a",
  DATE_YEAR_MONTH_FIRST: "YYYY-MM-DD",
  DAY_OF_MONTH: "D",
  LOCAL_DATE_WITH_LOCAL_TIME: "L, LTS",
  LOCAL_DATE_WITH_TIME: "l h:mm:ss A",
  LOCAL_TIME_WITH_SECONDS: "LTS",
  MINUTES_SECONDS: "mm:ss",
  MONTH_FULL: "MMMM",
  TIME_HOURS_MINUTES_AMPM: "hh:mm a",
  TIME_HOUR_NO_LEADING_0_MINUTES_AMPM: "h:mm A",
  TIME_HOURS_WITH_SECONDS: "HH:mm:ss"
};

/**
 * Converts a date/time on the client to be in the proper format for the server. Accepts a string or Moment object.
 * Defaults to a new Moment object with date/time set to now.
 *
 * @param {Moment|string} [dateTime=moment()] - The date/time on the client to convert for server
 * @param {string} fromFormat - The format to convert from (if moment needs a hint to convert)
 * @returns {string} The date/time as a utc ISO string
 */
export function getDateWithoutTimezone(dateTime, fromFormat) {
  if (!dateTime) {
    dateTime = moment();
  }

  const momentToConvert =
    typeof dateTime === "string" ? moment(dateTime, fromFormat) : dateTime;

  return momentToConvert.utc();
}

/**
 * Converts a date/time on the server to be in the proper format for the cleitn. Accepts a string or Moment object.
 * Defaults to a new Moment object with date/time set to now.
 *
 * @param {Moment|string} [dateTime=moment()] - The date/time from the server to convert for client
 * @param {string} fromFormat - The format to convert from (if moment needs a hint to convert)
 * @returns {Moment} A Moment object converted to local browser time
 */
export function applyBrowserTimezoneToDate(dateTime, fromFormat) {
  if (!dateTime) {
    dateTime = moment();
  }

  const momentToConvert =
    typeof dateTime === "string" ? moment(dateTime, fromFormat) : dateTime;

  return momentToConvert.local();
}

/**
 * Hack used by AccountHistoryEventsListItem.js to adjust the event times so they are presented properly.
 *
 * @param {string} date - The date that needs a hack solution
 * @returns {Moment} A Moment object adjusted to present properly for the account history events list
 */
export function adjustEventListTimeHack(date) {
  // After calling applyBrowserTimezoneToDate for the event times it is always off by two hours for some reason regardless of browser time zone
  return applyBrowserTimezoneToDate(date).add(2, "hours");
}

/**
 * Converts a date/time on the client to be in a special format for the server. Accepts a string or Moment object.
 * The toFormat is required.
 *
 * @param {Moment|string} [dateTime=moment()] - The date/time on the client to convert for server
 * @param {string} toFormat - The format to convert to
 * @param {string} fromFormat - The format to convert from (if moment needs a hint to convert)
 * @returns {string} The date/time as a utc ISO string
 */
export function clientMomentToSpecialServerFormat(
  dateTime,
  toFormat,
  fromFormat
) {
  if (!toFormat) {
    throw Error(
      "clientMomentToSpecialServerFormat must have toFormat to work properly"
    );
  }

  const momentToConvert =
    typeof dateTime === "string" ? moment(dateTime, fromFormat) : dateTime;

  return momentToConvert.format(toFormat);
}

/**
 * Checks if whatever is passed in is a date.
 *
 * @param {any} possibleDate - Argument to check if is date
 * @returns {boolean} True if possibleDate is a date
 */
export function isValidDate(possibleDate) {
  return moment(possibleDate).isValid();
}

/**
 * Converts a string as UTC into the desired format. If dateString is falsey it will return empty string.
 *
 * @param {string} date - The date string to format
 * @param {string} [format=moment.ISO_8601] - The format to convert to or ISO_8601 by default
 * @returns {string} The formatted string unless dateString is falsey then it returns empty string
 */
export function formatDateIgnoringTimezone(
  dateString,
  format = moment.ISO_8601
) {
  return dateString ? moment.utc(dateString).format(format) : "";
}

/**
 * Checks to see if a date is before another date. Can pass a format that the dates are in to aid Moment in the comparison.
 *
 * @param {string} checkDateString - The date to check if before
 * @param {string} compareDateString - The compare date
 * @param {string=} compareFormat - The format the dates are in
 */
export function isDateBefore(
  checkDateString,
  compareDateString,
  compareFormat
) {
  if (!checkDateString || !compareDateString) {
    return false;
  }

  return (
    moment(checkDateString, compareFormat).format("x") <
    moment(compareDateString, compareFormat).format("x")
  );
}

/**
 * Returns the time in UTC so it is not affected by timezone.
 *
 * @param {string} time - The time to convert to utc
 * @returns {Moment} The time as a utc Moment object
 */
export function timeToUTC(time) {
  return moment.utc(time);
}

/**
 * Returns a utc date from a desired hour and minute.
 *
 * @param {string|number} hour - The hour
 * @param {string|number} minute - The minute
 */
export function getUTCDateFromHourAndMinute(hour, minute) {
  return moment.utc(
    moment()
      .hour(hour)
      .minute(minute)
      .format(DATE_TIME_FORMATS.DATEBASE_FORMAT_WITHOUT_SECONDS)
  );
}

/**
 * Compare two dates.
 *
 * @param {string} a - Date to check
 * @param {string} b - Date to compare against
 * @returns {number} Negative if a is more recent, 0 if same, positive if a is older
 */
export function compareDates(a, b) {
  return moment.utc(a).diff(moment.utc(b));
}

export function formatSecondsForDisplay(seconds) {
  return moment(seconds * 1000).format(DATE_TIME_FORMATS.MINUTES_SECONDS);
}

export function durationInSeconds(time) {
  return moment.duration(time, "seconds");
}

/**
 * Returns the current date or the desired date formatted in the browser's timezone.
 *
 * @param {string} dateOrFormat - The date to format or the format desired for now()
 * @param {string} format - The desired format for passed in date
 * @returns {string} Desired date or now formatted
 */
export function formatDateWithTimezone(dateOrFormat, format = moment.ISO_8601) {
  const wasPassedValidDate = isValidDate(dateOrFormat);
  const date = wasPassedValidDate ? moment(dateOrFormat) : moment();
  const formatToUse = wasPassedValidDate ? format : dateOrFormat;

  return date.format(formatToUse);
}

/**
 * Returns the first day of the week leading up to a month (could be a few days before the month starts).
 *
 * @param {string|number} dateOrNumber - Date string or number
 * @returns First day of the week for a month
 */
export function getFirstDayOfWeekForMonth(dateOrNumber) {
  const date =
    typeof dateOrNumber === "number"
      ? moment().month(dateOrNumber)
      : dateOrNumber;

  const firstDayOfMonth = getStartOfDate(date, "month", false);

  return getStartOfDate(firstDayOfMonth, "week", false);
}

/**
 * Returns the last day of the week leading up to a month (could be a few days after the month ends).
 *
 * @param {string|number} dateOrNumber - Date string or number
 * @returns Last day of the week for a month
 */
export function getLastDayOfWeekForMonth(dateOrNumber) {
  const date =
    typeof dateOrNumber === "number"
      ? moment().month(dateOrNumber)
      : dateOrNumber;

  const lastDayOfMonth = getEndOfDate(date, "month", false);

  return getEndOfDate(lastDayOfMonth, "week", false);
}

/**
 * @param {string} dateOrUnit - The date to get the start of or the unit to get for now
 * @param {string|boolean} [unitOrAsISOString=true] - The unit to get for passed in date or whether or not should format as iso string
 * @param {boolean} [asISOString=true] - Whether or not should format as iso string
 * @returns {Moment|string} Returns the start of the date in desired unit as a Moment object or iso string
 */
export function getStartOfDate(
  dateOrUnit,
  unitOrAsISOString = true,
  asISOString = true
) {
  const date = isValidDate(dateOrUnit) ? dateOrUnit : undefined;
  const unitToUse = date ? unitOrAsISOString : dateOrUnit;
  const shouldBeIso = date ? asISOString : unitOrAsISOString;

  let momentObject = moment(date).startOf(unitToUse);

  return shouldBeIso ? momentObject.toISOString() : momentObject;
}

/**
 * @param {string} dateOrUnit - The date to get the end of or the unit to get for now
 * @param {string|boolean} [unitOrAsISOString=true] - The unit to get for passed in date or whether or not should format as iso string
 * @param {boolean} [asISOString=true] - Whether or not should format as iso string
 * @returns {Moment|string} Returns the end of the date in desired unit as a Moment object or iso string
 */
export function getEndOfDate(
  dateOrUnit,
  unitOrAsISOString = true,
  asISOString = true
) {
  const date = isValidDate(dateOrUnit) ? dateOrUnit : undefined;
  const unitToUse = date ? unitOrAsISOString : dateOrUnit;
  const shouldBeIso = date ? asISOString : unitOrAsISOString;

  let momentObject = moment(date).endOf(unitToUse);

  return shouldBeIso ? momentObject.toISOString() : momentObject;
}

export function isDateInBetween(date, startDate, endDate) {
  return moment.utc(date).isBetween(startDate, endDate);
}

export function isSameDate(date, otherDate, unit) {
  return moment.utc(date).isSame(otherDate, unit);
}

export function isCurrentDate(date, unit) {
  return isSameDate(date, moment(), unit);
}

export function getMonthFromDate(date) {
  if (date) {
    return moment(date).month();
  }

  return moment().month();
}

export function getDateAsMomentIfValid(date) {
  if (!date) {
    return undefined;
  }

  const momentDate = moment(date);

  return momentDate.isValid() ? momentDate : undefined;
}

export function formatElapsedSeconds(elapsedSeconds) {
  moment
    .utc(moment.duration(elapsedSeconds, "seconds").asMilliseconds())
    .format(DATE_TIME_FORMATS.TIME_HOURS_WITH_SECONDS);
}
