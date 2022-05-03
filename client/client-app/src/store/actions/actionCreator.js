import {
  FETCH_COMPANIES,
  FETCH_ITEMS,
  FETCH_ITEMBYID,
  SET_ISLOADING,
  SET_ISERROR,
} from "./actionType";

export const setItems = (payload) => {
  return { type: FETCH_ITEMS, payload };
};
export const setItemById = (payload) => {
  return { type: FETCH_ITEMBYID, payload };
};
export const setCompanies = (payload) => {
  return { type: FETCH_COMPANIES, payload };
};
export const setIsLoading = (payload) => {
  return { type: SET_ISLOADING, payload };
};
export const setIsError = (payload) => {
  return { type: SET_ISERROR, payload };
};
