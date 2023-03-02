import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tablesSlice, {tablesReducer} from "./tables-slice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [tablesSlice.name]: tablesReducer,
    },
    devTools: true,
  });

  export type AppStore = ReturnType<typeof makeStore>;
  export type AppState = ReturnType<AppStore["getState"]>;
  export type AppDispatch = AppStore["dispatch"];
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
  >;
  
  const wrapper = createWrapper<AppStore>(makeStore)
  
  export default wrapper;
  