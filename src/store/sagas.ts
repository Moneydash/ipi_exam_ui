import { all, fork } from "redux-saga/effects";
import crudSaga from "./crud/saga";

function* rootSaga() {
    yield all([
        fork(crudSaga)
    ]);
};

export default rootSaga;