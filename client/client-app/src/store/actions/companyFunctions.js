import { setCompanies, setIsLoading, setIsError } from "./actionCreator";

export const fetchCompanies = () => {
  return (dispatch, getState) => {
    fetch("http://localhost:3000/companies", {
      method: "GET",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setCompanies(data));
      })
      .catch((err) => {
        dispatch(setIsError(true));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};
