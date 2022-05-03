import { FETCH_COMPANIES } from "../actions/actionType";

const initialState = {
  companies: [],
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES :
      return { ...state, companies: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
