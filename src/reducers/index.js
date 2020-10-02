import { combineReducers } from "redux";
// Por cada dato que traigo hago un archivo especifico
import postsReducer from "./postsReducer";
import infoPostReducer from "./infoPostReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  info: infoPostReducer,
});

export default rootReducer;
