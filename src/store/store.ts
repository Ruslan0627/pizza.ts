import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user.slice";
import { saveState } from "./storage";

export const store = configureStore({
	reducer:{
		user: userSlice.reducer
	}
})

store.subscribe( () => {
	const state: RootStore = store.getState()
	const user = state.user
	const jwt = user.jwt
	if (jwt) saveState({jwt},"jwt")
} )
export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
