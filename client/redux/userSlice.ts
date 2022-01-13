import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IUser} from "../dto/user.dto";

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as IUser,

  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default userSlice;