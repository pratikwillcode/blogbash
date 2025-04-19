import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
    profileDetails: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.profileDetails = null;
        },
        setProfileDetails: (state, action) => {
            state.profileDetails = action.payload;
        }
    }
})

export default authSlice.reducer;
export const {login, logout, setProfileDetails} = authSlice.actions;