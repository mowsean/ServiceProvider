const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Using rules from: https://en.wikipedia.org/wiki/North_American_Numbering_Plan
const numberingPlanAreaCodeRegex = /([02-9][0-9]{2})/; // 3 digits, Can't start with 1
const centralOfficeCodeRegex = /(?!.11)([02-9][0-9]{2})/; // 3 digits, Can't start with 1, Can't have digit two and three both be 1
const lineNumberRegex = /([0-9]{4})/; // 4 digits
const phoneRegex = new RegExp(
  `${numberingPlanAreaCodeRegex.source}${centralOfficeCodeRegex.source}${
    lineNumberRegex.source
  }`
);

export const composeValidators = (...validators) => value => {
  const failedTest = validators.find(validator => !validator(value).isValid);

  if (failedTest) return failedTest(value);

  return {
    isValid: true,
    invalidMessage: ""
  };
};

export const isNotEmpty = (invalidMessage = "Must not be empty") => value => ({
  isValid: value && value.length > 0,
  invalidMessage
});

export const isAtLeast = (
  length,
  invalidMessage = `Must have at least ${length} characters`
) => value => ({
  isValid: !value || value.length === 0 || value.length >= length,
  invalidMessage
});

export const isAtMost = (
  length,
  invalidMessage = `Must have at most ${length} characters`
) => value => ({
  isValid: !value || value.length === 0 || value.length <= length,
  invalidMessage
});

// We are only making sure that the email address is valid -
// if it is empty, that is fine.
export const isEmailAddress = (
  invalidMessage = "Must be a valid email address"
) => value => ({
  isValid: !value || value.length === 0 || emailRegex.test(value),
  invalidMessage
});

export const isNotDuplicateValue = (
  list,
  field,
  invalidMessage = "This is a duplicate value"
) => value => ({
  isValid: !list.some(l => l[field] === value),
  invalidMessage
});

export const isOnlyDigits = invalidMessage => value => ({
  isValid: /(\d)*/.test(value),
  invalidMessage
});

export const isValidPhoneNumber = (
  invalidMessage = "Not a valid phone number"
) => value => ({
  isValid: !value || phoneRegex.test(value),
  invalidMessage
});

export const isNumberBetween = (
  min,
  max,
  invalidMessage = `This value must be between ${min} and ${max}`
) => value => ({
  isValid: !isNaN(value) && value >= min && value <= max,
  invalidMessage
});

export const isHour = composeValidators(
  isNotEmpty("Must not be empty"),
  isNumberBetween(0, 23, "Must be 0 - 23")
);

export const isMinute = composeValidators(
  isNotEmpty("Must not be empty"),
  isNumberBetween(0, 59, "Must be 0 - 59")
);

export const isValidTenDigitPhoneNumber = composeValidators(
  isOnlyDigits("Can only contain digits"),
  isAtLeast(10, "Must be 10 digits"),
  isAtMost(10, "Must be 10 digits"),
  isValidPhoneNumber("Must be valid phone")
);
