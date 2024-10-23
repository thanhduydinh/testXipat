import { combineReducers } from "redux";
// import loginReducer from "./pages/Login/Login.reducer";
import appReducer from "./App/App.reducer";

const rootReducer = combineReducers({
  // auth: loginReducer,
  app: appReducer
});

export default rootReducer;
