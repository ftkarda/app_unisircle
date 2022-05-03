import { combineReducers } from "redux";
// import categoryReducer from "./categoryReducer";
// import productReducer from "./productReducer";
import { SET_ISLOADING, SET_ISERROR } from "../actions/actionType";

const initialState = {
  isLoading: true,
  isError: false,
};

const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISLOADING:
      return { ...state, isLoading: action.payload };
    case SET_ISERROR:
      return { ...state, isError: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // categoryReducer,
  // productReducer,
  indexReducer,
});

export default rootReducer;
