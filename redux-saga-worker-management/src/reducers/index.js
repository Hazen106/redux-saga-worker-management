import { combineReducers } from "redux";
import workersReducer from "./WorkerReducer";

//Kết hợp các reducer thành một reducer tổng
const rootReducer = combineReducers({
    workers: workersReducer,
});

export default rootReducer;