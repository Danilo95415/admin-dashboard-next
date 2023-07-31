import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import reducer from "./reducer";
import HomeSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});
sagaMiddleware.run(HomeSaga);
