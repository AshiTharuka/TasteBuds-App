import { loginFailure, loginStart, loginSuccess } from "./userReducer.jsx";
import { publicRequest } from "../requestMethod.jsx";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  