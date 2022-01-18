import {AppThunk} from "../store";
import {roomSlice} from "./roomSlice";
import {IRoom} from "../../dto/room.dto";

export const setRoom = (room: IRoom): AppThunk =>
  async dispatch => {
  dispatch(
    roomSlice.actions.setRoom(room),
  );
};