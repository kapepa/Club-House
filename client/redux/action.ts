import {AppThunk} from "./store";
import userSlice from "./userSlice";

export const setUser = (user: any): AppThunk => {
  return  async dispatch => {
    dispatch(
      userSlice.actions.setUser({...user}),
    );
  };
}