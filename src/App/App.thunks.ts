import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getProfile, putProfile } from "../apis/staff.api";
// import { postLogout } from "../apis/user.api";

export const doGetProfile = createAsyncThunk("getProfile", async () => {
  // const res = await getProfile();
  // return res.data;
  return;
});

export const doPutProfile = createAsyncThunk("putProfile", async () => {
  // await putProfile(payload);
  // return payload;
  return;
});

// export const doLogout = createAsyncThunk("postLogout", async () => {
//   await postLogout();
//   return;
// });
