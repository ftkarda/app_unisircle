export const createUser = (payload) => {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    });
  };
};

export const loginHandler = (payload) => {
  return (dispatch, getState) => {
    return fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };
};
