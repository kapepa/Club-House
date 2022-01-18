import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {IRoom} from "../../dto/room.dto";

export const roomSlice = createSlice({
  name: 'room',
  initialState: {} as IRoom,
  reducers: {
    setRoom(state, action) {
      return state = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.room,
      };
    },
  },
});