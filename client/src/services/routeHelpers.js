import SC_DIVISIONS_DICT from "../constants/divisions";

export const isAdminPath = pathname => {
  const secondLevel = pathname.split("/").filter(x => !!x)[1] || "";
  return secondLevel.toLowerCase() === "admin";
};

export const isNormalPath = pathname => {
  const secondLevel = pathname.split("/").filter(x => !!x)[1] || "";
  return secondLevel.toLowerCase() === "normal-view";
};

export const isAgentPath = pathname => {
  const secondLevel = pathname.split("/").filter(x => !!x)[1] || "";
  return secondLevel.toLowerCase() === "";
};

/**
 * @function getDivisionFromPath
 * @param {string} pathname - The current URL path
 * @description
 *   Get division from current URL pathname. If no division, return empty-string (falsey) value.
 * @example
 *  /life/admin -> 'life'
 *  /sqah/manage-my-leads -> 'sqah'
 *  /other-thing/stuff -> ''
 * @return {string}
 * */
export const getSCDivisionFromPath = pathname => {
  const firstLevel = pathname.split("/").filter(x => !!x)[0];

  if (!firstLevel || !Object.values(SC_DIVISIONS_DICT).includes(firstLevel))
    return "";

  return firstLevel;
};
