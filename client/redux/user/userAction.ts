import {AppThunk} from "../store";
import {userSlice} from "./userSlice";
import {IUser} from "../../dto/user.dto";

export const setUser = (user: IUser): AppThunk => {
  return  async dispatch => {
    dispatch(
      userSlice.actions.setUser(user),
    );
  };
}