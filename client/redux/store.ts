import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import {createWrapper} from "next-redux-wrapper";
import {roomSlice} from "./room/roomSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
      [roomSlice.name]: roomSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export const wrapper = createWrapper<AppStore>(makeStore);