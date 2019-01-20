import { fetchWrapper } from "../restApi";

/**
 * @function fetchCategories
 * @description
 *   Fetch the roles in the system and return a Promise that contains either the roles array or undefined
 * @return {Promise<[Object]>} The roles array | undefined
 * */
export const fetchCategories = () => fetchWrapper("/api/ss/category");
