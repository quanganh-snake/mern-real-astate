import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	error: null,
	loading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signInStart: (state) => {
			state.loading = true;
		},
		signInSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
			state.error = null;
		},
		signInFailed: (state) => {
			state.error = true;
		},
	},
});

export const { signInStart, signInSuccess, signInFailed } = userSlice.actions;

export default userSlice.reducer;
