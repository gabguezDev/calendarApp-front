import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: "CHECKING",
		user: {},
		errorMessage: undefined,
	},
	reducers: {
		onChecking: (state /* action */) => {
			state.status = "CHECKING";
			state.user = {};
			state.errorMessage = undefined;
		},
		onLogin: (state, { payload }) => {
			state.status = "AUTHENTICATED";
			state.user = payload;
			state.errorMessage = undefined;
		},
		onLogout: (state, { payload }) => {
			state.status = "NOT-AUTHENTICATED";
			state.user = {};
			state.errorMessage = payload;
		},
		clearErrorMessage: state => {
			state.errorMessage = undefined;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } =
	authSlice.actions;
