import { FETCH_ITEMS, FETCH_ITEMBYID } from "../actions/actionType";

const initialState = {
  items: [],
  item: null,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload };
    case FETCH_ITEMBYID:
      return { ...state, item: action.payload };
    default:
      return state;
  }
};

export default itemReducer;
