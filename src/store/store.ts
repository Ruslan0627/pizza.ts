import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user.slice";
import { saveState } from "./storage";
import { cartSlice } from "./cart.slice";

export const store = configureStore({
	reducer:{
		user: userSlice.reducer,
		cart:cartSlice.reducer
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
