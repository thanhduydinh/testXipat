import { createSlice } from "@reduxjs/toolkit";
// import { doGetProfile, doPutProfile } from "./App.thunks";
// import { removeToken, removeRefreshToken } from "../utils/auth";

interface Profile {
  id: string;
  emailVerified: boolean;
  roles: string[];
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
}
interface AppInterface {
  loading: boolean;
  loadingChangeProfile: boolean;
  profile: Profile;
}

const initialState: AppInterface = {
  loading: false,
  loadingChangeProfile: false,
  profile: {} as Profile
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder;
    //  =========  Get Profile
    // .addCase(doGetProfile.pending, state => {
    //   state.loading = true;
    // })
    // .addCase(doGetProfile.fulfilled, (state, action) => {
    //   state.profile = action.payload;
    //   state.loading = false;
    // })
    // .addCase(doGetProfile.rejected, (state, action) => {
    //   state.loading = false;
    // })

    // //  =========  Put Profile
    // .addCase(doPutProfile.pending, state => {
    //   state.loadingChangeProfile = true;
    // })
    // .addCase(doPutProfile.fulfilled, (state, action) => {
    //   state.profile.username = action.payload.username;
    //   state.profile.firstName = action.payload.firstName;
    //   state.profile.lastName = action.payload.lastName;
    //   state.loadingChangeProfile = false;
    // })
    // .addCase(doPutProfile.rejected, (state, action) => {
    //   state.loadingChangeProfile = false;
    // })

    // //  =========  Logout
    // .addCase(doLogout.fulfilled, state => {
    //   state.profile = {} as Profile;
    //   removeToken();
    //   removeRefreshToken();
    // })
    // .addCase(doLogout.rejected, (_, action) => {});
  }
});

export default appSlice.reducer;
