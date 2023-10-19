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
		signInFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		updateUserStart: (state) => {
			state.loading = true;
		},
		updateUserSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
			state.error = null;
		},
		updateUserFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteUserStart: (state) => {
			state.loading = false;
		},
		deleteUserSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = null;
			state.error = null;
		},
		deleteUserFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		signOutUserStart: (state) => {
			state.loading = false;
		},
		signOutUserSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = null;
			state.error = null;
		},
		signOutUserFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailed,
	updateUserStart,
	updateUserSuccess,
	updateUserFailed,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailed,
	signOutUserStart,
	signOutUserSuccess,
	signOutUserFailed,
} = userSlice.actions;

export default userSlice.reducer;
