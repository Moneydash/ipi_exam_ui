import { combineReducers } from "redux";
import crudReducer from "./crud/reducer";

const rootReducer = combineReducers({
    crud: crudReducer
});

export default rootReducer;