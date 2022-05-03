import {
  setItems,
  setItemById,
  setIsLoading,
  setIsError,
} from "./actionCreator";

export const fetchItems = () => {
  return (dispatch, getState) => {
    fetch("http://localhost:3000/items", {
      method: "GET",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        console.log(response, "response");
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setItems(data));
      })
      .catch((err) => {
        dispatch(setIsError(true));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const fetchItemById = (id) => {
  return (dispatch, getState) => {
    fetch(`http://localhost:3000/items/${id}`, {
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
        dispatch(setItemById(data));
      })
      .catch((err) => {
        dispatch(setIsError(true));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const updateProductById = (id, payload) => {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    });
  };
};

export const createProduct = (payload) => {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    });
  };
};

export const deleteProductById = (id) => {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
  };
};
