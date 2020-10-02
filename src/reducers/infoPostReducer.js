import * as actions from "../actions/infoPostAction";

export const initialState = {
  info: [],
  loading: false,
  hasErrors: false,
};

export default function infoPostReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_INFO:
      return { ...state, loading: true };
    case actions.GET_INFO_SUCCESS:
      return { info: action.payload, loading: false, hasErrors: false };
    case actions.GET_INFO_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    default:
      return state;
  }
}
