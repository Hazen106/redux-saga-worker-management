import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootRenducer from "./reducers";
import rootSaga from "./sagas/WorkerSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootRenducer,
    middleware: (getDefaultMiddlewware) => 
        getDefaultMiddlewware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;